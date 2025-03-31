import { pathToFileURL, fileURLToPath } from 'url'
import { realpathSync } from 'fs'

/**
 * Создает задержку на указанное количество миллисекунд
 * @param {number} ms - Количество миллисекунд для задержки
 * @returns {Promise<void>} Promise, который разрешается после указанной задержки
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Преобразует путь к файлу в URL
 * @param {string} file - Путь к файлу
 * @returns {string} URL файла
 */
export const getFileUrl = (file) => pathToFileURL(realpathSync(file)).href
