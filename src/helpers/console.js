/**
 * Очищает консоль в зависимости от операционной системы
 */
export function clearConsole () {
  // Для Windows используем команду cls, для Unix-подобных - clear
  const isWindows = process.platform === 'win32'
  process.stdout.write(isWindows ? '\x1bc' : '\x1b[2J\x1b[0f')
}
