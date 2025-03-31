import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

/**
 * Инициализирует директорию для хранения временных файлов теста
 * и загружает сохраненные данные
 * @returns {Object} Загруженные данные о пройденных тестах
 */
export function initTestDirectory () {
  const easyTestDir = join(process.cwd(), '.latte')
  if (!existsSync(easyTestDir)) {
    mkdirSync(easyTestDir)
  }

  const passedTestsFile = join(easyTestDir, 'objects.json')
  let passed = {}

  if (existsSync(passedTestsFile)) {
    passed = JSON.parse(readFileSync(passedTestsFile, 'utf-8'))
  }

  return { passedTestsFile, passed }
}

/**
 * Сохраняет данные о пройденных тестах
 * @param {string} file - Путь к файлу для сохранения
 * @param {Object} data - Данные для сохранения
 */
export function saveTestResults (file, data) {
  writeFileSync(file, JSON.stringify(data, null, 2))
}
