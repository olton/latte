// src/reporters/junit/index.js
import fs from 'fs'
import path from 'path'
import { escape } from 'html-escaper'

function formatTime (time) {
  return (time / 1000).toFixed(3)
}

// Безопасная версия escape, которая обрабатывает null/undefined
function safeEscape (value) {
  return value != null ? escape(String(value)) : ''
}

export default function junitReporter (reportPath, testResults) {
  const outputDir = path.dirname(reportPath)

  // Убедимся, что директория существует
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xmlContent += '<testsuites>\n'

  let totalTests = 0
  let totalFailures = 0
  let totalTime = 0

  for (const filePath in testResults) {
    const fileResult = testResults[filePath]
    const fileName = path.basename(filePath)
    const testsInFile = fileResult.tests || []
    const describes = fileResult.describes || []

    let fileFailures = 0
    let fileTime = 0

    // Подсчитываем статистику для файла
    testsInFile.forEach(test => {
      if (!test.passed) fileFailures++
      fileTime += test.duration || 0
    })

    totalTests += testsInFile.length
    totalFailures += fileFailures
    totalTime += fileTime

    describes.forEach(describe => {
      // Формируем testsuite для каждого файла
      xmlContent += `  <testsuite name="${safeEscape(fileName)}" tests="${describe.tests.length}" failures="${fileFailures}" time="${formatTime(fileTime)}" timestamp="${new Date().toISOString()}">\n`

      // Добавляем каждый тест
      describe.tests.forEach(test => {
        const testName = test.name || ''
        const testTime = formatTime(test.duration || 0)

        if (test.passed) {
          xmlContent += `    <testcase name="${safeEscape(testName)}" classname="${safeEscape(filePath)}" time="${testTime}"/>\n`
        } else {
          xmlContent += `    <testcase name="${safeEscape(testName)}" classname="${safeEscape(filePath)}" time="${testTime}">\n`
          const errorMessage = test.message || 'Test failed'
          const errorStack = test.error?.stack || ''
          xmlContent += `      <failure message="${safeEscape(errorMessage)}">${safeEscape(errorStack)}</failure>\n`
          xmlContent += '    </testcase>\n'
        }
      })

      xmlContent += '  </testsuite>\n'
    })
  }

  xmlContent += '</testsuites>'

  // Записываем в файл
  fs.writeFileSync(reportPath, xmlContent)

  console.log(`JUnit: The report is saved into ${reportPath}`)
}
