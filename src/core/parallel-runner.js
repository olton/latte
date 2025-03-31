import { Worker } from 'worker_threads'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { FAIL } from '../config/index.js'

// Отримуємо правильний шлях до worker.js відносно поточного модуля
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const workerPath = path.join(__dirname, '..', 'workers', 'worker.js')

export async function parallel (testQueue, maxWorkers = 4) {
  const files = Array.from(testQueue.keys())
  const chunks = []
  let failedTests = 0
  const coverage = []

  // Розділяємо файли на групи для паралельного запуску
  for (let i = 0; i < files.length; i += maxWorkers) {
    chunks.push(files.slice(i, i + maxWorkers))
  }

  // Виконуємо тести для кожного чанка
  for (const chunk of chunks) {
    const workerPromises = chunk.map(file => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, {
          workerData: {
            file,
            config: global.config
          }
        })

        worker.on('message', (data) => {
          if (data.error) {
            console.log(chalk.red(`${FAIL} Error in file ${file}:`), data.error.message)
          }

          if (data.coverage) {
            coverage.push(data.coverage)
          }

          resolve(data.result || 0)
        })

        worker.on('error', (err) => {
          console.log(chalk.red(`Worker error for file ${file}:`), err)
          reject(err)
        })

        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`${FAIL} Worker for ${file} stopped with exit code ${code}`))
          }
        })
      })
    })

    // Чекаємо завершення всіх тестів у поточному чанку
    const results = await Promise.all(workerPromises)
    failedTests += results.reduce((sum, val) => sum + val, 0)
  }

  // Повертаємо кількість провалених тестів та дані про покриття
  return {
    failedTests,
    coverage
  }
}
