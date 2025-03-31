import { createRequire } from 'module'

import { expect as expectFn } from '../expects/expect.js'
import mockFn from './mock.js'
import { Browser } from '../browser/browser.js'
import { setup as setupDom, bye as byeDom, js, css, html } from '../dom/index.js'
import { delay, getFileUrl } from '../helpers/delay.js'
import { describe, it, test } from './api.js'
import { beforeEach, afterEach, beforeAll, afterAll } from './hooks.js'
import { waitFor } from '../utils/index.js'
import chalk from 'chalk'

import { initReact, render, cleanup, snapshot } from '../react/index.js'

export const DOM = {
  setup: setupDom,
  bye: byeDom,
  js,
  css,
  html
}

export function registerGlobals () {
  global.require = createRequire(import.meta.url)
  global.describe = describe
  global.it = it
  global.test = test
  global.expect = expectFn
  global.afterEach = afterEach
  global.beforeEach = beforeEach
  global.beforeAll = beforeAll
  global.afterAll = afterAll
  global.mock = mockFn
  global.fetch = mockFn(() => Promise.resolve({ json: () => ({}) }))
  global.delay = delay
  global.getFileUrl = getFileUrl
  global.DOM = DOM
  global.B = Browser
  global.waitFor = waitFor

  if (global.config && global.config.react) {
  }
}

export const register = (name, component) => {
  global[name] = component
}

export const registerGlobalEvents = () => {
  // Глобальная обработка ошибок
  process.on('uncaughtException', (error) => {
    console.error(chalk.red(`\n⛔ Unprocessed exception: ${error.message}\n`))
    console.error(chalk.gray(error.stack))
    process.exit(1)
  })

  process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red(`\n⛔ Unprocessed promise reject: ${reason}\n`))
    process.exit(1)
  })

  // Обработка сигналов завершения
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n⛔ The testing process was interrupted by the user!\n'))
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    console.log(chalk.yellow('\n⛔ The testing process was interrupted by the system!\n'))
    process.exit(0)
  })
}

export const expect = expectFn
export const mock = mockFn
export const fetch = mockFn(() => Promise.resolve({ json: () => ({}) }))
export const B = Browser

export { describe, it, test, beforeEach, afterEach, beforeAll, afterAll, delay, getFileUrl }
