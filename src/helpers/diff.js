import chalk from 'chalk'

export default function diff (expected, actual) {
  const stringifyValue = (value) => {
    if (value === undefined) return 'undefined'
    if (value === null) return 'null'
    if (typeof value === 'string') return `"${value}"`
    if (typeof value === 'function') return `[Function ${value.name || 'anonymous'}]`
    if (Array.isArray(value)) {
      return `[${value.map(stringifyValue).join(', ')}]`
    }
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value, null, 2)
      } catch (e) {
        return Object.prototype.toString.call(value)
      }
    }
    return String(value)
  }

  const expectedStr = stringifyValue(expected)
  const actualStr = stringifyValue(actual)

  if (expectedStr === actualStr) {
    return `${chalk.green(expectedStr)} === ${chalk.green(actualStr)}`
  }

  // Простое форматирование различий
  return `Expected: ${chalk.green(expectedStr)}\nReceived: ${chalk.red(actualStr)}`
}
