import fs, { existsSync, writeFileSync } from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {term} from '@olton/terminal'

export const LOGO = '🥛'
export const BOT = '🤖'
export const FAIL = '💀'

const defaultInclude = ['**/*.{test,spec}.{js,ts,jsx,tsx}']
const defaultExclude = ['node_modules/**']

export const defaultConfig = {
  verbose: false,
  dom: false,
  react: false,
  coverage: false,
  skipPassed: false,
  parallel: false,
  watch: false,
  debug: false,
  include: defaultInclude,
  exclude: defaultExclude,
  skip: '',
  test: '',
  reportType: 'console',
  reportDir: 'coverage',
  reportFile: '',
  maxWorkers: 4,
  progress: 'default'
}

export const updateConfig = (args) => {
  global.config = Object.assign({}, defaultConfig)

  const configFileName = args.config ?? 'latte.json'

  console.log(term('🔍 Searching for a config file...', { color: 'gray' }))
  if (fs.existsSync(configFileName)) {
    console.log(term('✅ Config file found!', { color: 'green' }))
    console.log(term(`   └── We use ${term(configFileName, {color: 'cyanBright'})} to configure Latte`, { color: 'gray' }))
    const userConfig = JSON.parse(fs.readFileSync(configFileName, 'utf-8'))
    Object.assign(config, userConfig)
  } else {
    console.log(term(`${BOT} Config file not found! We use default settings and CLI arguments!`, { color: 'gray' }))
    console.log(term(`   └── You can create ${term(configFileName, {color: 'cyanBright'})} to configure Latte`, { color: 'gray' }))
  }

  if (args.react && !args.dom) {
    console.log(term(`${BOT} Option --react requires --dom. Enabling DOM emulation automatically.`, { color: 'yellow' }))
    args.dom = true
  }

  if (args.dom) { config.dom = true }
  if (args.react) { config.dom = true; config.react = true }
  if (args.ts) { config.ts = true }
  if (args.coverage) { config.coverage = true }
  if (args.verbose) { config.verbose = true }
  if (args.skipPassed) { config.skipPassed = true }
  if (args.watch) { config.watch = true }
  if (args.debug) { config.debug = true }
  if (args.parallel) { config.parallel = true }

  if (args.test) { config.test = args.test.split(',') }
  if (args.include) { config.include = args.include.split(',') }
  if (args.exclude) { config.exclude = args.exclude.split(',') }
  if (args.skip) { config.skip = args.skip.split(',') }
  if (args.reportType) { config.reportType = args.reportType }
  if (args.reportDir) { config.reportDir = args.reportDir }
  if (args.reportFile) { config.reportDir = args.reportFile }
  if (args.maxWorkers) { config.maxWorkers = args.maxWorkers }
  if (args.progress) { config.progress = args.progress }

  if (config.reportType && !['console', 'lcov', 'html', 'junit'].includes(config.reportType)) {
    console.log(term(`${BOT} Unknown type of report: ${config.reportType}. Console will be used.`, { color: 'yellow' }))
    config.reportType = 'console'
  }
}

export const createConfigFile = (configFileName = 'latte.json') => {
  // Проверка существования файла
  if (existsSync(configFileName)) {
    console.log(term(`${BOT} Config file ${term(configFileName, {color: 'cyanBright'})} already exists.`, { color: 'yellow' }))
    console.log(term('   └── If you want to create a new file, delete the existing one.', { color: 'gray' }))
    console.log('\n')
    return false
  }

  // Создание файла с настройками по умолчанию
  try {
    writeFileSync(configFileName, JSON.stringify(defaultConfig, null, 2), 'utf-8')
    console.log(term(`✅ Config file ${term(configFileName, {color: 'cyanBright'})} created successfully!`, { color: 'green' }))
    console.log(term('   └── Now you can change the settings in this file.', { color: 'gray' }))
    console.log('\n')
    return true
  } catch (error) {
    console.error(term(`${FAIL} Failed to create a configuration file: ${error.message}`, { color: 'red' }))
    console.log('\n')
    return false
  }
}

export const processArgv = () => {
  return yargs(hideBin(process.argv))
    .option('watch', {
      alias: 'w',
      type: 'boolean',
      description: 'Run in observation mode'
    })
    .option('parallel', {
      alias: 'p',
      type: 'boolean',
      description: 'Run in parallel mode'
    })
    .option('dom', {
      alias: 'd',
      type: 'boolean',
      description: 'Enable DOM emulation'
    })
    .option('react', {
      alias: 'r',
      type: 'boolean',
      description: 'Enable React testing support'
    })
    .option('ts', {
      type: 'boolean',
      description: 'Enable TypeScript support'
    })
    .option('debug', {
      alias: 'g',
      type: 'boolean',
      description: 'Run tests in debug mode'
    })
    .option('verbose', {
      alias: 'b',
      type: 'boolean',
      description: 'Detailed report'
    })
    .option('coverage', {
      alias: 'c',
      type: 'boolean',
      description: 'Code coverage report'
    })
    .option('loader', {
      alias: 'l',
      type: 'boolean',
      description: 'Use experimental resolver for imports'
    })
    .option('max-workers', {
      type: 'string',
      description: 'Maximum number of parallel workers'
    })
    .option('include', {
      type: 'string',
      description: 'Test files switching templates'
    })
    .option('exclude', {
      type: 'string',
      description: 'Test file excluding templates'
    })
    .option('report-type', {
      type: 'string',
      description: 'Report Type [\'console\', \'lcov\', \'html\', \'junit\']'
    })
    .option('report-dir', {
      type: 'string',
      description: 'Reports Directory'
    })
    .option('report-file', {
      type: 'string',
      description: 'Report File Name'
    })
    .option('progress', {
      type: 'string',
      description: 'Progress Bar mode [\'default\', \'dots\', \'bar\']'
    })
    .option('init', {
      type: 'boolean',
      description: 'Create a configuration file'
    })
    .help()
    .argv
}

export const testJSX = () => {
  let requireTsx = false
  for (const ext of config.include) {
    if (ext.endsWith('.tsx') || ext.endsWith('.jsx') || ext.endsWith('.ts')) {
      requireTsx = true
      break
    }
  }
  return requireTsx
}
