#!/usr/bin/env -S node

import { registerGlobals, run } from '../src/index.js'
import { startWatchMode } from '../src/watcher.js'
import { term, termx } from '@olton/terminal'
import { BOT, DIVIDER, FAIL, LOGO, processArgv, testJSX, updateConfig } from '../src/config/index.js'
import { clearConsole } from '../src/helpers/console.js'
import { getProjectName } from '../src/helpers/project.js'
import { banner } from '../src/helpers/banner.js'
import { dirname, resolve } from 'path'
import { pathToFileURL, fileURLToPath } from 'url'
import { register } from 'node:module'
import { registerGlobalEvents } from '../src/index.js'
import { checkTsx } from '../src/typescript/index.js'
import { Cursor } from '@olton/terminal'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __root = dirname(__dirname)

const argv = processArgv()

try {
  registerGlobalEvents()
  if (argv.clearConsole || argv.idea) clearConsole()
  banner()
  updateConfig(argv)
  
  const root = process.cwd()

  const projectName = getProjectName(root)
  console.log(`${term('🚀 Executing tests for:', {color: 'blueBright'})} ${term(projectName, {style: 'bold'})}`)
  console.log(`${term(DIVIDER, {color: 'gray'})}`)
  console.log(`${term(`🏠 Project directory: ${term(root, {color: 'whiteBright'})}`, {color: 'gray'})}`)
  console.log(`${term(`⚙️ Tests included: ${term(config.include, {color: 'yellowBright'})}`, {color: 'gray'})}`)

  if (argv.init) {
    const configFileName = argv.config || 'latte.json'
    const { createConfigFile } = await import('../src/config/index.js')
    createConfigFile(configFileName)
    process.exit(0)
  }

  if (argv.loader) {
    console.log(term(`${BOT} Experimental loader mode is enabled!`, {color: 'yellow'}))
    const resolverPath = resolve(__dirname, '../src/resolver/index.js')
    register(pathToFileURL(resolverPath).href)
  }

  if (argv.ts || argv.react) {
    if (!checkTsx(root)) {
      console.log(term(`${BOT} To use TypeScript or test React Components you need to install TSX (https://tsx.is)!`, {color: 'red'}))
      console.log(term(`${BOT} └── After use: NODE_OPTIONS="--import tsx" latte ...`, {color: 'red'}))
      process.exit(1)
    } else {
      console.log(term(`${BOT} TSX found! TypeScript and JSX/TSX support is enabled!`, {color: 'green'}))
    }
  }

  registerGlobals()

  let result = null
  
  if (argv.watch) {
    await startWatchMode(root, config)
  } else {
    result = await run(root, config)
  }
  
  Cursor.show()

  for(const file in result) {
    if (result[file].completed === false) {
      process.exit(1)
    }
  }
  console.log(`Finished! ${term('🎉', {color: 'greenBright'})}`)
  if (!argv.watch) process.exit(0)
} catch (error) {
  if (error.message.includes('Directory import') && error.message.includes('is not supported')) {
    console.error(term(`\n${FAIL} Import of the Directory has been identified!`, {color: 'red'}))
    console.error(term('Please change import from: import {} from \'./directory\'', {color: 'yellow'}))
    console.error(term('To: import {} from \'./directory/index.js\'', {color: 'yellow'}))
    console.error(term('Or create package.json in this Directory with Field "exports"\n', {color: 'yellow'}))
    console.error(`${term('Original message:', {color: 'gray'})} ${error.message}\n`)
    Cursor.show()
    process.exit(1) 
  } else {
    console.error(term(`\n${FAIL} Latte executing stopped with message: ${error.message}`, {color: 'red'}))
    if (argv.verbose) {
      console.error(term(error.stack, {color: 'gray'}))
    }
    Cursor.show()
    process.exit(1)
  }  
}
