import fs from 'fs'
import { fileURLToPath } from 'url'
import { generateReport } from '../../core/coverage.js'

const createReport = (fileName, coverage) => {
  const { root, reportDir } = global.config
  const dir = `${reportDir}`
  const data = []

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  let totalLines = 0
  let coveredLines = 0

  coverage.map(({ url, functions }) => {
    const fileName = fileURLToPath(url)
    const sourceCode = fs.readFileSync(fileName, 'utf-8')

    const [_path, _name, _percent, _total, _covered, _uncovered] = generateReport(fileName.replace(root, ''), sourceCode, functions)

    totalLines += _total
    coveredLines += _covered

    data.push(`TN:${root}`)
    data.push(`SF:${fileName.replace(root, '')}`)
    data.push(`LF:${_total}`)
    data.push(`LH:${_covered}`)

    for (const fn of functions) {
      if (fn.functionName.startsWith('<')) {
        continue
      }
      data.push(`FN:${fn.ranges[0].startOffset},${fn.functionName}`)
      data.push(`FNDA:${fn.ranges[0].count},${fn.functionName}`)
    }

    for (let lineNumber = 1; lineNumber <= _total; lineNumber++) {
      if (_uncovered.includes(lineNumber)) {
        data.push(`DA:${lineNumber},0`)
      } else {
        data.push(`DA:${lineNumber},1`)
      }
    }

    data.push('end_of_record')
  })

  if (data.length === 0) {
    return
  }

  fs.writeFileSync(`${dir}/${fileName}`, data.join('\n'))
}

export default createReport
