/**
 * Повідомлення мають такий формат:
 * ```
 * ##teamcity[messageName 'value1' key2='value2' ...]
 * ```
 * Основні повідомлення для тестів:
 * - `testSuiteStarted name='...'` - початок набору тестів
 * - `testSuiteFinished name='...'` - завершення набору тестів
 * - `testStarted name='...'` - початок тесту
 * - `testFinished name='...'` - успішне завершення тесту
 * - `testFailed name='...' message='...' details='...'` - невдале виконання тесту
 * - `testIgnored name='...'` - пропущений тест
 */

/**
 * ### Загальні параметри:
 * 1. **`flowId`** - ідентифікатор потоку виконання, дозволяє розрізняти паралельні процеси
 * 2. **`timestamp`** - часова мітка події в форматі Unix timestamp
 * 3. **`nodeId`** - ідентифікатор вузла (використовується при розподіленому тестуванні)
 * 4. **`parentNodeId`** - ідентифікатор батьківського вузла
 * 5. **`name`** - назва тесту або набору тестів
 *
 * ### Для повідомлень про тести:
 * 1. **`duration`** - тривалість виконання тесту в мілісекундах
 * 2. **`locationHint`** - підказка розташування тесту, яка допомагає IDE перейти до тесту
 * 3. **`captureStandardOutput`** - визначає чи перехоплювати стандартний вивід (true/false)
 * 4. **`testType`** - тип тесту (unit, integration, тощо)
 * 5. **`status`** - статус тесту (passed, failed, ignored)
 *
 * ### Для повідомлень про помилки:
 * 1. **`errorDetails`** - детальна інформація про помилку
 * 2. **`actual`** - фактичне значення (для порівнянь)
 * 3. **`expected`** - очікуване значення (для порівнянь)
 * 4. **`type`** - тип помилки (assertion, exception, тощо)
 * 5. **`stackTrace`** - стек викликів помилки
 * 6. **`comparisonFailure`** - вказує, що помилка є порівнянням (true/false)
 *
 * ### Для повідомлень про артефакти:
 * 1. **`path`** - шлях до артефакту
 * 2. **`size`** - розмір артефакту
 *
 * Не реалізовано:
 * ### Для повідомлень про покриття коду:
 * 1. **`coverageStats`** - статистика покриття коду
 * 2. **`coverageClass`** - клас покриття
 * 3. **`coverageMethod`** - метод покриття
 * 4. **`coverageBlock`** - блок покриття
 * 5. **`coverageLine`** - рядок покриття
 */

import { term } from '@olton/terminal'

const log = console.log

/**
 * Парсить стек помилки для отримання рядка та стовпчика
 * @param stack
 * @param file
 * @returns number[] || string - [row, column]
 */
const parseStack = (stack, file) => {
    if (!stack) return ''
    const _file = file.replaceAll("\\", "/")
    const lines = stack.split('\n')
    const filteredLines = lines.filter(line => {
        // Фільтруємо рядки, які не містять інформацію про файл або номер рядка
        return line.includes(_file)
    })
    const parsed = filteredLines.length === 0 ? [0, 0] : filteredLines[0].match(/at (.+):(\d+):(\d+)/)
    if (parsed) {
        // Повертаємо рядок у форматі "file:line:column"
        return [+parsed[2], +parsed[3]]
    }
    return [0, 0]
}

const Console = {
    log: (message) => {
        if (typeof message === 'object') {
            message = JSON.stringify(message)
        }
        log(`##teamcity[message '${message}']`)
    },
    start: () => {
        log(`##teamcity[testingStarted]`)
    },
    finish: (duration) => {
        log(`##teamcity[testingFinished duration='${duration}']`)
    },
    suiteStarted: (name, filePath, nodeId = 0, parentNodeId = 'root', flowId = 0) => {
        const timestamp = new Date().toISOString().replace('Z', '')
        log(`##teamcity[testSuiteStarted name='${name.replaceAll("'", '"')}' locationHint='${filePath}' timestamp='${timestamp}' nodeId='suite_${nodeId}' parentNodeId='root' flowId='0']`)
    },
    suiteFinished: (name, duration) => {
        log(`##teamcity[testSuiteFinished name='${name.replaceAll("'", '"')}' duration='${duration}']`)
    },
    testStarted: (name, filePath, nodeId = 0, parentNodeId = 0, flowId = 0) => {
        log(`##teamcity[testStarted name='${name.replaceAll("'", '"')}' locationHint='${filePath}' nodeId='test_${nodeId}' parentNodeId='${parentNodeId}' flowId='${flowId}']`)
    },
    testFinished: (name, filePath, duration) => {
        log(`##teamcity[testFinished name='${name.replaceAll("'", '"')}' locationHint='${filePath}' duration='${duration}']`)
    },
    testFailed: (name, filePath, error, file = '') => {
        let { received, expected, message, stack } = error
        const [row, col] = parseStack(stack, file)
        if (typeof received === 'object' || typeof received === 'function') {
            received = typeof received
        }
        if (typeof expected === 'object' || typeof expected === 'function') {
            expected = typeof expected
        }
        
        received = received.toString().trim().replace(/[\r\n]+/g, ' ').replace(/'/g, '')
        expected = expected.toString().trim().replace(/[\r\n]+/g, ' ').replace(/'/g, '')
        
        log(`##teamcity[testFailed name='${name.replaceAll("'", '"')}' locationHint='${filePath}:${row}:${col}' details='Source: ${filePath}:${row}:${col}' message='${message.replace(/'/g, '')}' actual='${received}' expected='${expected}' type='assertion']`)
    },
    testIgnored: (name, filePath, message) => {
        log(`##teamcity[testIgnored name='${name.replaceAll("'", '"')}' message='${message}' locationHint='${filePath}']`)
    }
}

const setupAndTeardown = async (funcs, type) => {
    if (funcs && funcs.length) {
        for (const fn of funcs) {
            try {
                await fn()
            } catch (error) {
                log(` The ${type} function throw error with message: ${term('🔴 ' + error.message, { color: 'red' })}`)
            }
        }
    }
}

export const idea_runner = async (queue, options) => {
    // log(`##teamcity[testingStarted]`)
    Console.start()
    
    const startTime = Date.now()
    const { verbose, test: testName, suite: suiteName, skip, parallel, idea, progress, showStack = false } = options

    let passedTests = 0
    let failedTests = 0
    let totalTests = 0
    let totalTestCount = 0

    for (const q of queue) {
        for (const job of q[1].describes) {
            totalTestCount += job.it.length
        }
        totalTestCount += q[1].tests.length
    }

    for (const [file, jobs] of queue) {
        const startFileTime = process.hrtime()
        let testFileStatus = true
        let testFilePassed = 0
        let testFileFailed = 0
        const filePath = jobs.filePath || file

        global.testResults[file] = {
            describes: [],
            tests: [],
            duration: 0,
            completed: true
        }

        if (jobs.describes.length) {
            let describeId = 0
            for (const describe of jobs.describes) {
                if (suiteName) {
                    if (describe.name.includes(suiteName) === false) {
                        continue
                    }
                }
                // const timestamp = new Date().toISOString().replace('Z', '')
                // log(`##teamcity[testSuiteStarted name='${describe.name}' locationHint='${filePath}::${describe.name}' timestamp='${timestamp}' nodeId='suite_${describeId}' parentNodeId='root' flowId='${0}']`)
                Console.suiteStarted(describe.name, filePath, describeId, 'root', 0)

                await setupAndTeardown(describe.beforeAll, 'beforeAll')

                const describes = {
                    name: describe.name,
                    tests: [],
                    duration: 0
                }

                global.testResults[file].describes.push(describes)
                const startDescribeTime = Date.now()
                let testId = 0
                for (const test of describe.it) {
                    let expect = {}

                    if (testName) {
                        if (testName && test.name.includes(testName) === false) {
                            // log(`##teamcity[testIgnored name='${test.name}' message='Test skipped by name filter' locationHint='${filePath}::${test.name}']`)
                            Console.testIgnored(test.name, filePath, 'Test skipped by name filter')
                            continue
                        }
                    }
                    if (skip) {
                        if (skip && test.name.includes(skip) === true) {
                            // log(`##teamcity[testIgnored name='${test.name}' message='Test skipped by name filter' locationHint='${filePath}::${test.name}']`)
                            Console.testIgnored(test.name, filePath, 'Test skipped by name filter')
                            continue
                        }
                    }

                    // log(`##teamcity[testStarted name='${test.name}' locationHint='${filePath}::${test.name}' nodeId='test_${testId}' parentNodeId='suite_${describeId}' flowId='${0}']`)
                    Console.testStarted(test.name, filePath, testId, `suite_${describeId}`, 0)
                    
                    // Execute test function
                    const startTestTime = Date.now()

                    try {
                        await setupAndTeardown(test.beforeEach, 'beforeEach')
                        await test.fn()
                        expect.result = true
                        // log(`##teamcity[testFinished name='${test.name}' locationHint='${filePath}::${test.name}' duration='${Date.now() - startTestTime}']`)
                        Console.testFinished(test.name, filePath, Date.now() - startTestTime)
                    } catch (error) {
                        // const {received, expected, message, stack} = error
                        // const [row, col] = parseStack(stack, file)
                        // log(`##teamcity[testFailed name='${test.name}' locationHint='${filePath}:${row}:${col}' details='Source: ${filePath}:${row}:${col}' message='${message.replace(/'/g, '')}' actual='${received}' expected='${expected}' type='assertion' stackTrace='${showStack ? stack.replace(/'/g, '') : ''}']`)
                        Console.testFailed(test.name, filePath, error, file)
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

                    if (expect.result) {
                        passedTests++
                        testFilePassed++
                    } else {
                        failedTests++
                        testFileFailed++
                        testFileStatus = false
                    }

                    totalTests++
                    testId++
                }

                await setupAndTeardown(describe.afterAll, 'afterAll')

                // log(`##teamcity[testSuiteFinished name='${describe.name}' duration='${Date.now() - startDescribeTime}']`)
                Console.suiteFinished(describe.name, Date.now() - startDescribeTime)
                
                describeId++
            }
        }

        if (jobs.tests.length && !suiteName) {
            for (const test of jobs.tests) {
                let expect = {}

                if (testName && test.name.includes(testName) === false) {
                    // log(`##teamcity[testIgnored name='${test.name}' message='Test skipped by name filter' locationHint='${filePath}::${test.name}']`)
                    Console.testIgnored(test.name, filePath, 'Test skipped by name filter')
                    continue
                }
                if (skip && test.name.includes(skip) === true) {
                    // log(`##teamcity[testIgnored name='${test.name}' message='Test skipped by name filter' locationHint='${filePath}::${test.name}']`)
                    Console.testIgnored(test.name, filePath, 'Test skipped by name filter')
                    continue
                }

                // log(`##teamcity[testStarted name='${test.name}' locationHint='${filePath}']`)
                Console.testStarted(test.name, filePath)

                // Execute test function
                const startTestTime = Date.now()
                
                await setupAndTeardown(test.beforeEach, 'beforeEach')

                try {
                    await test.fn()
                    expect.result = true
                    // log(`##teamcity[testFinished name='${test.name}' locationHint='${filePath}::${test.name}' duration='${Date.now() - startTestTime}']`)
                    Console.testFinished(test.name, filePath, Date.now() - startTestTime)
                } catch (error) {
                    // const {received, expected, message, stack} = error
                    // const [row, col] = parseStack(stack, file)
                    // log(`##teamcity[testFailed name='${test.name}' locationHint='${filePath}:${row}:${col}' details='Source: ${filePath}:${row}:${col}' message='${message.replace(/'/g, '')}' actual='${received}' expected='${expected}' type='assertion' stackTrace='${showStack ? stack.replace(/'/g, '') : ''}']`)
                    Console.testFailed(test.name, filePath, error, file)
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
            }
        }

        const [seconds, nanoseconds] = process.hrtime(startFileTime)
        global.testResults[file].duration = (seconds * 1e9 + nanoseconds) / 1e6
    }
    
    // log(`##teamcity[testingFinished deration='${Date.now() - startTime}']`)
    Console.finish(Date.now() - startTime)

    return failedTests
}
