import { fileURLToPath, pathToFileURL } from 'url'
import path from 'path'

export async function resolve (specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (error) {
    if (error.code === 'ERR_UNSUPPORTED_DIR_IMPORT' && error.message.includes('Directory import')) {
      // Спробуємо використати index.js
      const dirPath = fileURLToPath(new URL(specifier, context.parentURL))
      const indexPath = path.join(dirPath, 'index.js')

      try {
        return await nextResolve(pathToFileURL(indexPath).href, context)
      } catch (innerError) {
        throw error // Якщо не вдалося, повертаємо оригінальну помилку
      }
    }
    throw error
  }
}
