// API для запуска тестов
import { testQueue } from './queue.js'
import { hooksRegistry } from './hooks.js'

export function describe (name, fn) {
  const currentDescribe = {
    name,
    it: [],
    beforeAll: [],
    afterAll: [],
    context: this
  }

  testQueue.setCurrentDescribe(currentDescribe)

  for (const fn1 of hooksRegistry.beforeAllFile) {
    currentDescribe.beforeAll.push(fn1.bind(this))
  }

  fn.apply(this)

  for (const fn1 of hooksRegistry.beforeAllSuite) {
    currentDescribe.beforeAll.push(fn1.bind(this))
  }

  for (const fn1 of hooksRegistry.afterAllSuite) {
    currentDescribe.afterAll.push(fn1.bind(this))
  }

  for (const fn1 of hooksRegistry.afterAllFile) {
    currentDescribe.afterAll.push(fn1.bind(this))
  }

  testQueue.addDescribe(currentDescribe)

  hooksRegistry.clearSuiteLevelHooks()
}

export async function it (name, fn) {
  const currentDescribe = testQueue.getCurrentDescribe()

  const testScope = {
    name,
    expects: {},
    fn: fn.bind(currentDescribe.context),
    beforeEach: [],
    afterEach: []
  }

  for (const fn1 of hooksRegistry.beforeEachFile) {
    testScope.beforeEach.push(fn1.bind(this))
  }
  for (const fn1 of hooksRegistry.beforeEachSuite) {
    testScope.beforeEach.push(fn1.bind(this))
  }

  for (const fn1 of hooksRegistry.afterEachSuite) {
    testScope.afterEach.push(fn1.bind(this))
  }
  for (const fn1 of hooksRegistry.afterEachFile) {
    testScope.afterEach.push(fn1.bind(this))
  }

  currentDescribe.it.push(testScope)
}

export async function test (name, fn) {
  const testScope = {
    name,
    expects: {},
    fn: fn.bind(this),
    beforeEach: [],
    afterEach: []
  }

  for (const fn1 of hooksRegistry.beforeEachFile) {
    testScope.beforeEach.push(fn1.bind(this))
  }
  for (const fn1 of hooksRegistry.afterEachFile) {
    testScope.afterEach.push(fn1.bind(this))
  }

  testQueue.addTest(testScope)
}
