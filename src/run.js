import { glob } from 'glob'
import { pathToFileURL } from 'url'
import { realpathSync } from 'fs'
import inspector from 'inspector/promises'
import { coverageFilter, displayReport } from './core/coverage.js'
import { runner } from './core/runner.js'
import { idea_runner } from './core/idea-runner.js'
import { parallel } from './core/parallel-runner.js'
import { testQueue } from './core/queue.js'
import { hooksRegistry } from './core/hooks.js'
import { DOM } from './core/registry.js'

import path from 'path'
import { term, termx } from '@olton/terminal'
import { checkReactDependencies } from './react/check-deps.js'
import { cleanup, initReact, render, snapshot } from './react/index.js'
import { BOT, FAIL } from './config/index.js'
import { findJsxTests, findTypeScriptTests } from './typescript/index.js'

// Главная функция запуска тестов
export const run = async (root, options = {}) => {
    global.testResults = {}
    options.root = root

    let files = []

    // Если указаны конкретные файлы, используем их
    if (options.files && options.files.length) {
        files = options.files
    }
    // Иначе используем паттерны включения/исключения
    else {
        const includePattern = options.include || '**/__tests__/**/*.test.js'
        const excludePattern = options.exclude || []
        files = await glob(includePattern, { ignore: excludePattern })
    }

    if (!files.length) {
        console.log(term(`${BOT} No tests found!`, {color: 'red'}))
        process.exit(1)
    } else {
        if (!options.idea) console.log(term(`${BOT} We found ${termx.yellowBright.write(files.length)} test file(s)`, {color: 'gray'}))
        if (config.suite) {
            if (!options.idea) console.log(term(`${BOT} Running tests in suite: ${termx.yellowBright.write(config.suite)}`, {color: 'gray'}))
        }
        if (config.test) {
            if (!options.idea) console.log(term(`${BOT} Running test: ${termx.yellowBright.write(config.test)}`, {color: 'gray'}))
        }
    }

    if (options.debug) {
        const inspectPort = options.debug ? (options.debugPort || 9229) : undefined
        if (!options.idea) console.log(term('[Debug] Waiting for debugger to attach...', {color: 'yellow'}))
        process.execArgv.push(`--inspect-brk=${inspectPort}`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (!options.idea) console.log(term(`[Debug] Starting in debug mode on port ${inspectPort}`, {color: 'green'}))
    }

    if (findJsxTests(files) && !options.react) {
        if (!options.idea) console.log(term(`${BOT} We found JSX/TSX tests in your scope! --dom and --react options activated!`, {color: 'yellow'}))
        options.react = true
        options.dom = true
    }

    if (findTypeScriptTests(files) && !options.ts) {
        if (!options.idea) console.log(term(`${BOT} We found TypeScript tests in your scope! --ts option activated!`, {color: 'yellow'}))
        options.ts = true
    }

    if (options.dom || options.react) {
        if (!options.idea) console.log(term(`${BOT} Preparing test environment...`, {color: 'green'}))
    }

    if (!options.idea) console.log(term(`   ${options.dom || options.react ? '├' : '└'}── ⚙️ Global objects ready!`, {color: 'green'}))

    if (options.dom) {
        await DOM.setup()
        if (!options.idea) console.log(term(`   ${options.react ? '├' : '└'}── 📦 DOM ready (environment set to ${options.domEnv})!`, {color: 'green'}))
    }

    if (options.react) {
        if (!checkReactDependencies(root)) {
            if (!options.idea) console.error(term(`${FAIL} ⚛️ React cannot be initialized due to missing dependencies.`, {color: 'red'}))
            process.exit(1)
        }
        const reactInitialized = initReact()
        if (reactInitialized) {
            global.R = {
                render,
                cleanup,
                snapshot
            }
        }
        if (!options.idea) console.log(term('   └── ⚛️ React ready!', {color: 'green'}))
    }

    // Инициализация сессии для измерения покрытия кода
    const session = new inspector.Session()
    session.connect()

    await session.post('Profiler.enable')
    await session.post('Profiler.startPreciseCoverage', {
        callCount: true,
        detailed: true
    })

    testQueue.clearQueue()

    // Загрузка и выполнение тестовых файлов
    for (const file of files) {
        const fileUrl = pathToFileURL(realpathSync(file)).href
        testQueue.setCurrentFile(file, fileUrl)
        hooksRegistry.clearAllHooks()
        
        // При повторном запуске тестов нужно удалить кеш модуля
        if (options.watch) {
            delete require.cache[require.resolve(file)]
        }
        await import(fileUrl)
    }

    // Запуск тестов
    if (options.parallel) {
        await parallel(testQueue.getQueue(), options.maxWorkers)
    } else {
        if (options.idea) {
            await idea_runner(testQueue.getQueue(), options)
        } else {
            await runner(testQueue.getQueue(), options)
        }
    }

    const coverage = await session.post('Profiler.takePreciseCoverage')
    await session.post('Profiler.stopPreciseCoverage')

    if (options.react) {
        try {
            cleanup()
        } catch (e) {
            // Ігноруємо помилки
        }
    }
    
    // Обработка покрытия кода, если включено
    if (options.coverage) {
        const filteredCoverage = coverageFilter(coverage)

        if (options.reportType === 'lcov') {
            const createReport = await import('./reporters/lcov/index.js')
            createReport.default(options.reportDir + path.sep + (options.reportFile || 'easy-report.lcov'), filteredCoverage)
        } else if (options.reportType === 'html') {
            const createReport = await import('./reporters/html/index.js')
            createReport.default(options.reportDir + path.sep + (options.reportFile || 'easy-report.html'), global.testResults, filteredCoverage)
        } else if (options.reportType === 'junit') { // Добавляем новое условие для junit
            const createReport = await import('./reporters/junit/index.js')
            createReport.default(options.reportDir + path.sep + (options.reportFile || 'junit.xml'), global.testResults)
        } else {
            displayReport(filteredCoverage)
        }
    }
    
    return global.testResults
}
