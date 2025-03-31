import fs from 'fs'
import path from 'path'

export const getProjectName = (rootDir) => {
  try {
    const packageJsonPath = path.join(rootDir, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      if (packageData.name) {
        return packageData.name
      }
    }
    return path.basename(rootDir)
  } catch (error) {
    console.error(`Error when determining the name of the project: ${error.message}`)
    return path.basename(rootDir)
  }
}
