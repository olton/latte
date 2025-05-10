// Хранение функций хуков
import { parentFunc } from '../helpers/parent-func.js'

class HooksRegistry {
  constructor () {
    this.beforeEachFile = []
    this.afterEachFile = []
    this.beforeEachSuite = []
    this.afterEachSuite = []
    this.beforeAllFile = []
    this.afterAllFile = []
    this.beforeAllSuite = []
    this.afterAllSuite = []
  }

  clearFileLevelHooks () {
    this.beforeAllFile = []
    this.afterAllFile = []
    this.beforeEachFile = []
    this.afterEachFile = []
  }

  clearSuiteLevelHooks () {
    this.beforeAllSuite = []
    this.afterAllSuite = []
    this.beforeEachSuite = []
    this.afterEachSuite = []
  }

  clearAllHooks () {
    this.beforeEachFile = []
    this.afterEachFile = []
    this.beforeEachSuite = []
    this.afterEachSuite = []
    this.beforeAllFile = []
    this.afterAllFile = []
    this.beforeAllSuite = []
    this.afterAllSuite = []
  }
}

export const hooksRegistry = new HooksRegistry()

export function beforeEach (fn) {
  if (parentFunc() === 'describe') {
    hooksRegistry.beforeEachSuite.push(fn)
  } else {
    hooksRegistry.beforeEachFile.push(fn)
  }
}

export function afterEach (fn) {
  if (parentFunc() === 'describe') {
    hooksRegistry.afterEachSuite.push(fn)
  } else {
    hooksRegistry.afterEachFile.push(fn)
  }
}

export function beforeAll (fn) {
  if (parentFunc() === 'describe') {
    hooksRegistry.beforeAllSuite.push(fn)
  } else {
    hooksRegistry.beforeAllFile.push(fn)
  }
}

export function afterAll (fn) {
  if (parentFunc() === 'describe') {
    hooksRegistry.afterAllSuite.push(fn)
  } else {
    hooksRegistry.afterAllFile.push(fn)
  }
}
