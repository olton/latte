import { parentPort, workerData } from 'worker_threads'
import { pathToFileURL } from 'url'
import { realpathSync } from 'fs'
import inspector from 'inspector/promises'
import { DOM, registerGlobals } from '../core/registry.js'
import { updateConfig } from '../config/index.js'
import { runner } from '../core/runner.js'
import { testQueue } from '../core/queue.js'
import { hooksRegistry } from '../core/hooks.js'

import { coverageFilter } from '../core/coverage.js'

// Отримуємо дані про файл тесту з основного потоку
const { file, config: workerConfig } = workerData

// Асинхронне виконання тестів в окремому потоці
async function runTest () {
  // Ініціалізація глобальних об'єктів
  global.config = workerConfig
  global.passed = {}

  // Реєструємо глобальні функції та змінні
  registerGlobals()

  // Налаштування DOM якщо потрібно
  if (global.config.dom) {
    await DOM.setup()
  }

  // Ініціалізація сесії для вимірювання покриття коду
  let session
  let coverage = null
  session = new inspector.Session()
  session.connect()

  await session.post('Profiler.enable')
  await session.post('Profiler.startPreciseCoverage', {
    callCount: true,
    detailed: true
  })

  // Підготовка черги для тестованого файлу
  testQueue.setCurrentFile(file)
  hooksRegistry.clearFileLevelHooks()

  // Імпорт тестового файлу
  const fileUrl = pathToFileURL(realpathSync(file)).href
  await import(fileUrl)

  // Створюємо тимчасову чергу тільки для цього файлу
  const fileQueue = new Map()
  fileQueue.set(file, testQueue.getQueue().get(file))

  // Запускаємо тести для цього файлу
  const result = await runner(fileQueue, config)

  // Збираємо інформацію про покриття коду
  const coverageData = await session.post('Profiler.takePreciseCoverage')
  await session.post('Profiler.stopPreciseCoverage')
  coverage = coverageFilter(coverageData)

  // Очищення DOM, якщо він був ініціалізований
  if (global.config.dom) {
    await DOM.bye()
  }

  // Відправляємо результат назад в основний потік
  parentPort.postMessage({
    file,
    result,
    coverage
  })
}

// Обробка помилок
process.on('unhandledRejection', (reason) => {
  parentPort.postMessage({
    file,
    error: {
      message: reason.message,
      stack: reason.stack
    },
    result: 1
  })
  process.exit(1)
})

// Запускаємо виконання тестів
runTest().catch(error => {
  parentPort.postMessage({
    file,
    error: {
      message: error.message,
      stack: error.stack
    },
    result: 1
  })
  process.exit(1)
})
