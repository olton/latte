import path from 'path'
import fs from 'fs'

export const checkTsx = (root) => {
  const packageJsonPath = path.join(root, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }
  return !!deps.tsx
}

export const findJsxTests = (files) => {
  let result = false
  for (const file of files) {
    const ext = path.extname(file)
    if (['.tsx', '.jsx'].includes(ext)) {
      result = true
      break
    }
  }

  return result
}

export const findTypeScriptTests = (files) => {
  let result = false
  for (const file of files) {
    const ext = path.extname(file)
    if (['.ts', '.tsx'].includes(ext)) {
      result = true
      break
    }
  }

  return result
}
