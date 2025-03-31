#!/usr/bin/env -S node

import { registerGlobals, run } from '../src/index.js'
import { startWatchMode } from '../src/watcher.js'
import chalk from 'chalk'
import { BOT, FAIL, LOGO, processArgv, testJSX, updateConfig } from '../src/config/index.js'
import { clearConsole } from '../src/helpers/console.js'
import { getProjectName } from '../src/helpers/project.js'
import { banner } from '../src/helpers/banner.js'
import { dirname, resolve } from 'path'
import { pathToFileURL, fileURLToPath } from 'url'
import { register } from 'node:module'
import { registerGlobalEvents } from '../src/core/registry.js'
import { checkTsx } from '../src/typescript/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __root = dirname(__dirname)

const argv = processArgv()

try {
  registerGlobalEvents()

  const root = process.cwd()

  clearConsole()
  banner()

  const projectName = getProjectName(root)
  console.log(`${chalk.cyan('🚀 Executing tests for project:')} ${chalk.bold(projectName)}\n`)

  if (argv.init) {
    const configFileName = argv.config || 'latte.json'
    const { createConfigFile } = await import('../src/config/index.js')
    createConfigFile(configFileName)
    process.exit(0)
  }

  if (argv.loader) {
    console.log(chalk.yellow(`${BOT} Experimental loader mode is enabled!`))
    const resolverPath = resolve(__dirname, '../src/resolver/index.js')
    register(pathToFileURL(resolverPath).href)
  }

  updateConfig(argv)

  if (argv.ts || argv.react) {
    if (!checkTsx(root)) {
      console.log(chalk.red(`${BOT} To use TypeScript or test React Components you need to install TSX (https://tsx.is)!`))
      console.log(chalk.red(`${BOT} └── After use: NODE_OPTIONS="--import tsx" latte ...`))
      process.exit(1)
    } else {
      console.log(chalk.green(`${BOT} TSX found! TypeScript and JSX/TSX support is enabled!`))
    }
  }

  registerGlobals()

  if (argv.watch) {
    await startWatchMode(root, config)
  } else {
    await run(root, config)
  }
} catch (error) {
  if (error.message.includes('Directory import') && error.message.includes('is not supported')
  ) {
    console.error(chalk.red(`\n${FAIL} Import of the Directory has been identified!`))
    console.error(chalk.yellow('Please change import from: import {} from \'./directory\''))
    console.error(chalk.green('To: import {} from \'./directory/index.js\''))
    console.error(chalk.cyan('Or create package.json in this Directory with Field "exports"\n'))
    console.error(`${chalk.gray('Original message:')} ${error.message}\n`)
    process.exit(1)
  } else {
    console.error(chalk.red(`\n${FAIL} Latte executing stopped with message: ${error.message}`))
    if (argv.errorStack) {
      console.error(chalk.gray(error.stack))
    }
    process.exit(1)
  }
}
