// Управление очередью тестов
export class TestQueue {
  constructor () {
    this.queue = new Map()
    this.currentTestFile = ''
    this.currentDescribe = {}
  }

  setCurrentFile (file, filePath = '') {
    this.currentTestFile = file

    this.queue.set(file, {
      describes: [],
      tests: [],
      beforeAll: [],
      afterAll: [],
      filePath: filePath,
    })
  }

  getCurrentFile () {
    return this.currentTestFile
  }

  setCurrentDescribe (describe) {
    this.currentDescribe = describe
  }

  getCurrentDescribe () {
    return this.currentDescribe
  }

  addDescribe (describe) {
    const testObject = this.queue.get(this.currentTestFile)
    testObject.describes.push(describe)
    this.queue.set(this.currentTestFile, testObject)
  }

  addTest (test) {
    const testObject = this.queue.get(this.currentTestFile)
    testObject.tests.push(test)
    this.queue.set(this.currentTestFile, testObject)
  }

  getQueue () {
    return this.queue
  }

  clearQueue () {
    this.queue = new Map()
    this.currentTestFile = null
    this.currentDescribe = {}
  }
}

export const testQueue = new TestQueue()
