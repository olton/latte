import { createRequire } from 'module'

import { expect as expectFn } from '../expects/expect.js'
import mockFn from './mock.js'
import spyFn from './spy.js'
import { Browser } from '../browser/browser.js'
import { setup as setupDom, bye as byeDom, js, css, html } from '../dom/index.js'
import { delay, getFileUrl } from '../helpers/delay.js'
import { describe, suite, it, test } from './api.js'
import { beforeEach, afterEach, beforeAll, afterAll } from './hooks.js'
import { waitFor } from '../utils/index.js'
import {term} from '@olton/terminal'
import { STOP } from '../config/index.js'

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
  global.suite = suite
  global.it = it
  global.test = test
  global.expect = expectFn
  global.afterEach = afterEach
  global.beforeEach = beforeEach
  global.beforeAll = beforeAll
  global.afterAll = afterAll
  global.mock = mockFn
  global.spy = spyFn
  global.fetch = mockFn(() => Promise.resolve({ json: () => ({}) }))
  global.delay = delay
  global.getFileUrl = getFileUrl
  global.DOM = DOM
  global.B = Browser
  global.waitFor = waitFor
}

export const register = (name, component) => {
  global[name] = component
}

export const registerGlobalEvents = () => {
  // Глобальная обработка ошибок
  process.on('uncaughtException', (error) => {
    console.error(term(`\n${STOP} Unprocessed exception: ${error.message}\n`, { color: 'red' }))
    console.error(term(error.stack, { color: 'gray' }))
    process.exit(1)
  })

  process.on('unhandledRejection', (reason, promise) => {
    console.error(term(`\n${STOP} Unprocessed promise reject: ${reason}\n`, { color: 'red' }))
    process.exit(1)
  })

  // Обработка сигналов завершения
  process.on('SIGINT', () => {
    console.log(term(`\n${STOP} The testing process was interrupted by the user!\n`, { color: 'yellow' }))
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    console.log(term(`\n${STOP} The testing process was interrupted by the system!\n`, { color: 'yellow' }))
    process.exit(0)
  })
}

export const expect = expectFn
export const mock = mockFn
export const spy = spyFn
export const fetch = mockFn(() => Promise.resolve({ json: () => ({}) }))
export const B = Browser

export { describe, it, test, beforeEach, afterEach, beforeAll, afterAll, delay, getFileUrl, suite }
