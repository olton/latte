import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import { htmlTemplate } from './template.js'
import { basename } from 'node:path'
import { fileURLToPath } from 'url'

/**
 * Преобразует данные о тестах в формат, подходящий для шаблона отчета
 * @param {Object} testsData - Данные о выполненных тестах
 * @param {Array} coverage - Данные о покрытии кода тестами
 * @returns {Object} - Форматированные данные для отчета
 */
function prepareReportData (testsData, coverage) {
  const startTime = Date.now()
  let totalTests = 0
  let passedTests = 0
  let failedTests = 0

  const files = []

  for (const [filePath, fileData] of Object.entries(testsData)) {
    const fileResult = {
      file: filePath,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      allPassed: true,
      duration: fileData.duration || 0,
      tests: []
    }

    // Добавляем обработку случая с директивами describe
    if (fileData.describes && fileData.describes.length > 0) {
      for (const suite of fileData.describes) {
        const suiteResult = {
          name: suite.name,
          tests: []
        }

        if (suite.tests && suite.tests.length > 0) {
          for (const test of suite.tests) {
            const testResult = {
              name: test.name,
              passed: test.result,
              error: !test.result ? test.message : null
            }

            suiteResult.tests.push(testResult)
            fileResult.totalTests++
            totalTests++

            if (testResult.passed) {
              fileResult.passedTests++
              passedTests++
            } else {
              fileResult.failedTests++
              failedTests++
              fileResult.allPassed = false
            }
          }
        }

        fileResult.tests.push(suiteResult)
      }
    }

    // Обработка верхнеуровневых тестов (без describe)
    if (fileData.tests && fileData.tests.length > 0) {
      const topLevelSuite = {
        name: '', // Пустое имя для верхнеуровневых тестов
        tests: []
      }

      for (const test of fileData.tests) {
        const testResult = {
          name: test.name,
          passed: !test.error,
          error: test.error ? test.error.message : null
        }

        topLevelSuite.tests.push(testResult)
        fileResult.totalTests++
        totalTests++

        if (testResult.passed) {
          fileResult.passedTests++
          passedTests++
        } else {
          fileResult.failedTests++
          failedTests++
          fileResult.allPassed = false
        }
      }

      if (topLevelSuite.tests.length > 0) {
        fileResult.tests.push(topLevelSuite)
      }
    }

    files.push(fileResult)
  }

  const _coverage = coverage.map(({ url, functions }) => {
    const fileName = fileURLToPath(url)
    const sourceCode = readFileSync(fileName, 'utf-8')

    const [path, name, percent, complete, total, covered, uncovered] = generateReport(fileName, sourceCode, functions)

    return {
      path,
      name,
      percent,
      complete,
      total,
      covered,
      uncovered
    }
  })

  return {
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests
    },
    files,
    coverage: coverage ? _coverage : null,
    timestamp: new Date().toLocaleString(),
    duration: Date.now() - startTime
  }
}

/**
 * Создает HTML-отчет на основе результатов выполнения тестов
 * @param {string} reportFile - Путь к файлу для сохранения отчета
 * @param {Object} testsData - Результаты выполнения тестов
 * @param {Array} coverage - Данные о покрытии кода
 */
export default function createHtmlReport (reportFile, testsData, coverage = null) {
  try {
    // Создаем директорию для отчета, если она не существует
    const reportDir = config.reportDir
    mkdirSync(reportDir, { recursive: true })

    // Подготавливаем данные для отчета
    const reportData = prepareReportData(testsData, coverage)

    // Генерируем HTML на основе шаблона
    const htmlReport = htmlTemplate(reportData)

    // Записываем отчет в файл
    writeFileSync(reportFile, htmlReport)

    console.log(`HTML report successfully created: ${reportFile}`)
  } catch (error) {
    console.error('Error in creating HTML report:', error)
  }
}

const generateReport = (filename, sourceCode, functions) => {
  const uncoveredLines = []

  for (const cov of functions) {
    for (const range of cov.ranges) {
      if (range.count !== 0) continue
      const startLine = sourceCode.substring(0, range.startOffset).split('\n').length
      const endLine = sourceCode.substring(0, range.endOffset).split('\n').length
      for (let charIndex = startLine; charIndex <= endLine; charIndex++) {
        uncoveredLines.push(charIndex)
      }
    }
  }

  const totalLines = sourceCode.split('\n').length
  const coveredLines = totalLines - uncoveredLines.length

  const baseName = basename(filename)
  const fileName = filename.replace(baseName, '')
  const percent = (coveredLines * 100 / totalLines).toFixed(2)
  const complete = '' + percent === '100.00'

  return [
    fileName,
    baseName,
    percent,
    complete,
    totalLines,
    coveredLines,
    uncoveredLines.length
  ]
}
