import chalk from 'chalk'
import { stringify } from '../helpers/json.js'
import matchInArray from '../helpers/match-in-array.js'
import { Progress } from '@olton/progress'

const log = console.log

const logExpect = (name, { result, message, expected, received }, duration = 0) => {
  log(`      ${result ? chalk.green('🟢 ' + name + ` 🕑 ${chalk.whiteBright(`${duration} ms`)}`) : chalk.red('🔴 ' + name + ' (' + message + ')')}`)
  if (!result) {
    log(`        ${chalk.magentaBright('Expected:')} ${chalk.magentaBright.bold(stringify(expected))}`)
    log(`        ${chalk.cyanBright('Received:')} ${chalk.cyanBright.bold(stringify(received))}`)
  }
}

const setupAndTeardown = async (funcs, type) => {
  if (funcs && funcs.length) {
    for (const fn of funcs) {
      try {
        await fn()
      } catch (error) {
        log(` The ${type} function throw error with message: ${chalk.red('🔴 ' + error.message)}`)
      }
    }
  }
}

export const runner = async (queue, options) => {
  const startTime = process.hrtime()
  const { verbose, test: spec, skip, parallel } = options

  let passedTests = 0
  let failedTests = 0
  let totalTests = 0
  let totalTestCount = 0
  let progressBar = null

  for (const q of queue) {
    for (const job of q[1].describes) {
      totalTestCount += job.it.length
    }
    totalTestCount += q[1].tests.length
  }
  if (!verbose && !parallel) {
    log(' ')
    // progressBar = new Progress(totalTestCount);
    progressBar = new Progress({
      total: totalTestCount,
      width: 30,
      mode: options.progress,
      startMessageColor: 'whiteBright',
      completeMessage: 'Tests completed in {{elapsed}}s',
      completeMessageColor: 'gray',
      processMessageColor: 'whiteBright',
      processMessage: '',
      showCompleteMessage: true,
      unitName: 'test',
    })
  }

  for (const [file, jobs] of queue) {
    // const fileHash = await getFileHash(realpathSync(file))

    const startFileTime = process.hrtime()
    let testFileStatus = true
    let testFilePassed = 0
    let testFileFailed = 0

    if (verbose) log(`📜 ${chalk.gray('Test file:')} ${chalk.bold.yellow(file)}...`)

    global.testResults[file] = {
      describes: [],
      tests: [],
      duration: 0,
      completed: true
    }

    if (jobs.describes.length) {
      if (verbose) log(`  Tests  Suites ${jobs.describes.length}:`)
      for (const describe of jobs.describes) {
        if (verbose) log(`    ${chalk.blue(describe.name)} (${describe.it.length} tests):`)

        await setupAndTeardown(describe.beforeAll, 'beforeAll')

        const describes = {
          name: describe.name,
          tests: [],
          duration: 0
        }

        global.testResults[file].describes.push(describes)

        for (const test of describe.it) {
          let expect = {}

          if (spec && spec.length) {
            if (matchInArray(test.name, spec) === false) {
              continue
            }
          }
          if (skip && skip.length) {
            if (matchInArray(test.name, skip) === true) {
              continue
            }
          }

          // Execute test function
          const startTestTime = process.hrtime()

          try {
            await setupAndTeardown(test.beforeEach, 'beforeEach')
            await test.fn()
            expect.result = true
          } catch (error) {
            global.testResults[file].completed = false
            expect = {
              result: false,
              message: error.message,
              expected: error.expected,
              received: error.received
            }
          } finally {
            await setupAndTeardown(test.afterEach, 'afterEach')
          }

          describes.tests.push({
            name: test.name,
            result: expect.result,
            message: expect.message || 'OK'
          })

          const [seconds, nanoseconds] = process.hrtime(startTestTime)
          const testDuration = (seconds * 1e9 + nanoseconds) / 1e6

          if (expect.result) {
            passedTests++
            testFilePassed++
          } else {
            failedTests++
            testFileFailed++
            testFileStatus = false
          }

          totalTests++

          if (verbose) {
            logExpect(test.name, expect, testDuration)
          } else {
            if (!parallel) {
              progressBar && progressBar.process(1, `${chalk.yellow('[{{percent}}%]')} ${file}`)
            }
          }
        }

        await setupAndTeardown(describe.afterAll, 'afterAll')
      }
    }

    if (jobs.tests.length) {
      if (verbose) log(`  Simple tests ${jobs.tests.length}:`)

      for (const test of jobs.tests) {
        // console.log(test)
        let expect = {}

        if (spec && spec.length) {
          if (matchInArray(test.name, spec) === false) {
            continue
          }
        }
        if (skip && skip.length) {
          if (matchInArray(test.name, skip) === true) {
            continue
          }
        }

        await setupAndTeardown(test.beforeEach, 'beforeEach')

        try {
          await test.fn()
          expect.result = true
        } catch (error) {
          global.testResults[file].completed = false
          expect = {
            result: false,
            message: error.message,
            expected: error.expected,
            received: error.received
          }
        }

        global.testResults[file].tests.push({
          name: test.name,
          result: expect.result,
          message: expect.message || 'OK'
        })

        if (expect.result) {
          passedTests++
          testFilePassed++
        } else {
          failedTests++
          testFileFailed++
          testFileStatus = false
        }

        await setupAndTeardown(test.afterEach, 'afterEach')

        totalTests++

        if (verbose) {
          logExpect(test.name, expect)
        } else {
          if (!parallel) {
            progressBar && progressBar.process(1, `${chalk.yellow('[{{percent}}%]')} ${file}`)
          }
        }
      }
    }

    const [seconds, nanoseconds] = process.hrtime(startFileTime)
    global.testResults[file].duration = (seconds * 1e9 + nanoseconds) / 1e6
  }

  const [seconds, nanoseconds] = process.hrtime(startTime)
  const duration = (seconds * 1e9 + nanoseconds) / 1e6

  if (failedTests) { log('\n') }

  for (const [file, result] of Object.entries(global.testResults)) {
    if (result.completed) {
      continue
    }
    const fileStatus = result.completed ? chalk.green('🟢') : chalk.red('🔴')
    log(`${fileStatus} ${file}...${result.completed ? chalk.green('OK') : chalk.red('FAIL')} 🕑 ${chalk.whiteBright(`${result.duration} ms`)}`)
    for (const desc of result.describes) {
      const testsCount = desc.tests.length
      if (desc.result) {
        continue
      }
      let testIndex = 0
      for (const test of desc.tests) {
        testIndex++
        if (test.result) {
          continue
        }
        const s = testIndex === testsCount ? '└──' : '├──'
        log(chalk.white(` ${s} ${chalk.white(test.name)} >>> ${chalk.gray(test.message)} <<<`))
      }
    }
    let testIndex = 0
    for (const test of result.tests) {
      testIndex++
      if (test.result) {
        continue
      }
      const s = testIndex === result.tests.length ? '└──' : '├──'
      log(chalk.white(` ${s} ${chalk.white(test.name)} >>> ${chalk.gray(test.message)} <<<`))
    }
  }

  if (!parallel) {
    log(chalk.gray('\n-----------------------------------------------------------------'))
    log(`${chalk.gray('Total')}: ${chalk.blue.bold(totalTests)}, ${chalk.gray('Passed')}: ${chalk.green.bold(passedTests)}, ${chalk.gray('Failed')}: ${chalk.red.bold(failedTests)}`)
    log(' ')
  }

  return failedTests
}
