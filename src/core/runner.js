import { stringify } from '../helpers/json.js'
import matchInArray from '../helpers/match-in-array.js'
import { Progress } from '@olton/progress'
import { term, termx, Screen, Cursor } from '@olton/terminal'
import { BOT } from '../config/index.js'

const log = console.log

const logExpect = (name, { result, message, expected, received }, duration = 0) => {
  log(`      ${result ? term('🟢 ' + name + ` 🕑 ${term(`${duration} ms`, {color: 'whiteBright'})}`, {color: 'green'}) : term('🔴 ' + name + ' (' + message + ')', {color: 'red'})}`)
  if (!result) {
    log(`        ${term('Expected:', {color: 'magentaBright'})} ${term(stringify(expected), {style: 'bold', color: 'magentaBright'})}`)
    log(`        ${term('Received:', {color: 'cyanBright'})} ${term(stringify(received), {style: 'bold', color: 'cyanBright'})}`)
  }
}

const setupAndTeardown = async (funcs, type) => {
  if (funcs && funcs.length) {
    for (const fn of funcs) {
      try {
        await fn()
      } catch (error) {
        log(` The ${type} function throw error with message: ${term('🔴 ' + error.message, {color: 'red'})}`)
      }
    }
  }
}

export const runner = async (queue, options) => {
  const startTime = process.hrtime()
  const { verbose, test: testName, suite: suiteName, skip, parallel, idea, progress } = options

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

  log(' ')

  if (progress !== "none" && !verbose && !parallel) {
    progressBar = new Progress({
      total: totalTestCount,
      width: 30,
      mode: options.progress,
      completeMessage: 'Tests completed in {{elapsed}}s',
      completeMessageColor: 'gray',
      messageColor: 'whiteBright',
      message: '',
      unitName: 'test',
      barColor: 'blueBright',
      cursor: false,
    })

    if (!idea) await progressBar.here()
  }
  
  const processTest = (file, count = 1) => {
    if (progress !== 'none' && progressBar) {
      for (let i = 0; i < count; i++) {
        progressBar.process(`${term('[{{percent}}%]', {color: 'yellow'})} ${file}`)
      }
    }
  }
  
  for (const [file, jobs] of queue) {
    // const fileHash = await getFileHash(realpathSync(file))

    const startFileTime = process.hrtime()
    let testFileStatus = true
    let testFilePassed = 0
    let testFileFailed = 0

    if (verbose) log(`📜 ${term('Test file:', {color: 'gray'})} ${term(file, {style: 'bold', color: 'yellow'})}...`)

    global.testResults[file] = {
      describes: [],
      tests: [],
      duration: 0,
      completed: true
    }

    if (jobs.describes.length) {
      if (verbose) log(`  Tests  Suites ${jobs.describes.length}:`)
      for (const describe of jobs.describes) {
        if (verbose) log(`    ${term(describe.name, {color: 'blue'})} (${describe.it.length} tests):`)

        if (suiteName) {
          if (describe.name.includes(suiteName) === false) {
            processTest(file, describe.it.length)
            continue
          }
        }
        
        await setupAndTeardown(describe.beforeAll, 'beforeAll')

        const describes = {
          name: describe.name,
          tests: [],
          duration: 0
        }

        global.testResults[file].describes.push(describes)

        for (const test of describe.it) {
          let expect = {}

          if (testName) {
            if (testName && test.name.includes(testName) === false) {
              processTest(file)
              continue
            }
          }
          if (skip) {
            if (skip && test.name.includes(skip) === true) {
              processTest(file)
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
            if (progress === 'none') {
              process.stdout.write(term(`\r⚙️ Processed: ${file}...`))
              Screen.clearRight()
            } else if (!parallel) {
              processTest(file)
            }
          }
        }

        await setupAndTeardown(describe.afterAll, 'afterAll')
      }
    }

    if (jobs.tests.length && !suiteName) {
      if (verbose) log(`  Simple tests ${jobs.tests.length}:`)

      for (const test of jobs.tests) {
        // console.log(test)
        let expect = {}

        if (testName && test.name.includes(testName) === false) {
          processTest(file)
          continue
        }
        if (skip && test.name.includes(skip) === true) {
          processTest(file)
          continue
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
          if (progress === 'none') {
            process.stdout.write(term(`\r⚙️ Processed: ${file}...`))
          } else if (!parallel) {
            processTest(file)
          }
        }
      }
    } else {
      if (!verbose) {
        processTest(file, jobs.tests.length)
      }
    }

    const [seconds, nanoseconds] = process.hrtime(startFileTime)
    global.testResults[file].duration = (seconds * 1e9 + nanoseconds) / 1e6
  }

  if (progress === "none") {
    process.stdout.write(termx.blue.write(`\r${BOT} Process completed. All tests executed!`))
    Screen.clearRight()
  }
  
  const [seconds, nanoseconds] = process.hrtime(startTime)
  const duration = (seconds * 1e9 + nanoseconds) / 1e6

  if (failedTests) { log('\n') }

  for (const [file, result] of Object.entries(global.testResults)) {
    if (result.completed) {
      continue
    }
    const fileStatus = term('🔴', {color: 'red'})
    log(`${fileStatus} ${file}...${term('FAIL', {color: 'red'})} 🕑 ${term(`${result.duration} ms`, {color: 'whiteBright'})}`)
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
        log(term(` ${s} ${term(test.name, {color: 'whiteBright'})} >>> ${term(test.message, {color: 'gray'})} <<<`, {color: 'white'}))
      }
    }
    let testIndex = 0
    for (const test of result.tests) {
      testIndex++
      if (test.result) {
        continue
      }
      const s = testIndex === result.tests.length ? '└──' : '├──'
      log(term(` ${s} ${term(test.name, {color: 'whiteBright'})} >>> ${term(test.message, {color: 'gray'})} <<<`, {color: 'white'}))
    }
  }

  if (!parallel) {
    log(term('\n-----------------------------------------------------------------', {color: 'gray'}))
    log(termx.gray.write(`Total files processed: ${termx.whiteBright.write(Object.entries(global.testResults).length)}`))
    log(`${term('Total Tests', {color: 'gray'})}: ${term(totalTests, {style: 'bold', color: 'blue'})}, ${term('Passed', {color: 'gray'})}: ${term(passedTests, {style: 'bold', color: 'green'})}, ${term('Failed', {color: 'gray'})}: ${term(failedTests, {style: 'bold', color: 'red'})}, ${term('Duration', {color: 'gray'})}: ${term(`${duration} ms`, {color: 'yellow'})}`)
    log(' ')
  }

  return failedTests
}
