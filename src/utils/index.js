/**
 * Wait for component update
 * @returns {Promise<void>}
 */
export function waitFor (ms = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
