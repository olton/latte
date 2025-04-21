import chokidar from 'chokidar'
import path from 'path'
import { run } from './index.js'
import { clearConsole } from './helpers/console.js'
import fs from 'fs'
import { testQueue } from './core/queue.js'
import { hooksRegistry } from './core/hooks.js'
import { glob } from 'glob'
import {term} from '@olton/terminal'

let isFirstRun = true
let runningTests = false
let watcher = null

const help = () => {
  console.log('\n')
  console.log(term('- Press "q" to exit', {color: 'yellow'}))
  console.log(term('- Press "a" to launch all tests', {color: 'yellow'}))
  console.log(term('- Press "f" to launch failed tests', {color: 'yellow'}))
  console.log(term('- Press "c" to clean the console', {color: 'yellow'}))
  console.log(term('- Press "h" this help', {color: 'yellow'}))
  console.log('\n')
}

export async function startWatchMode (root, options) {
  if (!options.watch) {
    return run(root, options)
  }

  global.failedTests = []

  console.log(term('\n=== Latte Watch Mode ===', {color: 'cyan'}))

  const includePatterns = options.include
    ? (Array.isArray(options.include) ? options.include : [options.include])
    : ['**/__tests__/**/*.test.js', '**/*.test.js']

  const excludePatterns = options.exclude
    ? (Array.isArray(options.exclude) ? options.exclude : [options.exclude])
    : []

  const fileExtensions = ['.js', '.ts', '.tsx', '.jsx']

  const ignorePatterns = [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '.git',
    ...excludePatterns
  ]

  help()

  // Check the existence of files from Includepatterns
  const validPatterns = includePatterns.filter(pattern => {
    // Если это точный путь к файлу
    if (!pattern.includes('*')) {
      try {
        const fullPath = path.resolve(root, pattern)
        return fs.existsSync(fullPath)
      } catch (e) {
        return false
      }
    }
    return true
  })

  if (validPatterns.length === 0) {
    console.warn(term('Attention: these inclusions templates do not correspond to existing files!', {color: 'yellow'}))
    console.log(term('The standard template is used: **/__tests__/**/*.test.js, **/*.test.js', {color: 'cyan'}))
    validPatterns.push('**/__tests__/**/*.test.js', '**/*.test.js')
  }

  // We create an observer for all supported file types
  watcher = chokidar.watch(await glob([
    ...validPatterns,
    '**/*.js',
    '**/*.ts',
    '**/*.tsx',
    '**/*.jsx'
  ], { ignore: excludePatterns }), {
    depth: 10,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    },
    ignored: ignorePatterns,
    persistent: true,
    ignoreInitial: true,
    cwd: '.'
  })

  setupInteractiveMode(watcher, root, options)

  // Launch tests at the first start
  if (isFirstRun) {
    console.log(term('Starting tests...', {color: 'cyan'}))
    runTests(root, options)
    isFirstRun = false
  }

  watcher.on('ready', () => {

  })

  // We process file changes
  watcher.on('all', (event, filePath) => {
    const extension = path.extname(filePath)

    // We check that this is a supported file and other tests are not currently executed
    if (fileExtensions.includes(extension) && !runningTests) {
      clearConsole()

      console.log(term(`File ${filePath} was ${event}\n`, {color: 'cyan'}))

      // Check if the file corresponds to the power patterns
      const isTestFile = validPatterns.some(pattern => {
        // If this is an accurate way to a file
        if (!pattern.includes('*')) {
          return pattern === filePath
        }
        // Support for Glob Patterns
        return new RegExp(pattern
          .replace(/\./g, '\\.')
          .replace(/\*\*\//g, '.*')
          .replace(/\*/g, '[^/]*')).test(filePath)
      })

      // If it is a test file, we only start it
      if (isTestFile && event !== 'unlink') {
        const testOptions = { ...options }
        testOptions.files = [path.join(root, filePath)]
        runTests(root, testOptions)
      } else {
        // For the source files, we're looking for related tests
        const relatedTestFile = findRelatedTestFile(root, filePath)
        if (relatedTestFile) {
          const testOptions = { ...options }
          testOptions.files = [relatedTestFile]
          runTests(root, testOptions)
        } else {
          // If you haven't found a related test, we start all the tests
          runTests(root, options)
        }
      }
    }
  })

  return new Promise((resolve) => {
    // This promise will never be resolved so that the process continues to work
    // The output will occur only on an obvious call process.exit()
  })
}

/**
 * Setting an interactive console regime
 */
function setupInteractiveMode (watcher, root, options) {
  process.stdin.setRawMode && process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', async (key) => {
    // The exit from Watch-mode when pressed 'q'
    if (key === 'q') {
      watcher.close().then(() => {
        console.log(term('\nWatch mode is completed. Bye!\n', {color: 'green'}))
        process.exit(0)
      })
    }

    // Launch of all tests when pressing 'a'
    if (key === 'a' && !runningTests) {
      clearConsole()
      console.log(term('Launch all tests ...', {color: 'cyan'}))
      await runTests(root, options)
    }

    // Launching only failed tests when pressing 'f'
    if (key === 'f' && !runningTests && global.failedTests) {
      clearConsole()
      console.log(term('The launch failed tests ...', {color: 'cyan'}))
      const failedOptions = { ...options, include: global.failedTests, watch: false }
      await runTests(root, failedOptions)
    }

    // Cleaning the console when pressed 'c'
    if (key === 'c') {
      clearConsole()
      console.log(term('The console is cleaned. Waiting for changes...', {color: 'cyan'}))
    }

    if (key === 'h') {
      clearConsole()
      help()
    }
  })
}

/**
 * Tries to find a related test file for the source file
 * @param {string} root - The root directory of the project
 * @param {string} sourceFile - Way to the source file
 * @returns {string|null} - The path to a null or null test file
 */
function findRelatedTestFile (root, sourceFile) {
  // We get a file name without extension
  const basename = path.basename(sourceFile, path.extname(sourceFile))
  const dirname = path.dirname(sourceFile)

  // Possible test options for tests
  const possibleTestLocations = [
    path.join(dirname, '__tests__', `${basename}.test.js`),
    path.join(dirname, '__tests__', `${basename}.test.ts`),
    path.join(dirname, `${basename}.test.js`),
    path.join(dirname, `${basename}.test.ts`)
  ]

  // We check every possible way
  for (const testPath of possibleTestLocations) {
    const fullPath = path.resolve(root, testPath)
    if (fs.existsSync(fullPath)) {
      return testPath
    }
  }

  return null
}

/**
 * Launches tests with these options
 * @param {string} root - The root directory of the project
 * @param {object} options - Options for starting tests
 */
async function runTests (root, options) {
  try {
    runningTests = true
    // const startTime = Date.now();

    // We keep the Watch flag to avoid recursive launch of Watch-mode
    const watchMode = options.watch
    const newOptions = { ...options, watch: false }

    clearTestRegistry()

    // Запускаем тесты
    const result = await run(root, newOptions)

    for (const file in result) {
      const fileName = path.basename(file)
      if (!result[file].completed && !global.failedTests.includes(`**/${fileName}`)) {
        global.failedTests.push(`**/${fileName}`)
      }
    }

    // const endTime = Date.now();
    // const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log(term('\nWaiting for changes...', {color: 'yellow'}))
  } catch (error) {
    console.error(term('\nError when starting tests:', {color: 'red'}))
    console.error(error)
  } finally {
    runningTests = false
  }
}

function clearTestRegistry () {
  // Clean the test queue
  if (typeof testQueue !== 'undefined' && testQueue.clearQueue) {
    testQueue.clearQueue()
  }

  // Clean the register of Khukov
  if (typeof hooksRegistry !== 'undefined' && hooksRegistry.clearAllHooks) {
    hooksRegistry.clearAllHooks()
  }

  // We drop the test results
  global.testResults = {}
}
