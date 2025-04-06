import fs from 'fs'
import path from 'path'
import { FAIL, BOT } from '../config/index.js'
import {term} from '@olton/terminal'

export const checkReactDependencies = (projectRoot) => {
  try {
    const packageJsonPath = path.join(projectRoot, 'package.json')
    if (!fs.existsSync(packageJsonPath)) {
      console.error(term(`${FAIL} Cannot find package.json in the project root`, {color: 'red'}))
      return false
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    }

    const missingDeps = []

    if (!dependencies.react) {
      missingDeps.push('react')
    }

    if (!dependencies['react-dom']) {
      missingDeps.push('react-dom')
    }

    if (missingDeps.length > 0) {
      console.error(term(`${FAIL} Missing required dependencies for React testing: ${missingDeps.join(', ')}`, {color: 'red'}))
      console.log(term(`${BOT} Please install them using: npm install ${missingDeps.join(' ')}`, {color: 'yellow'}))
      return false
    }

    return true
  } catch (error) {
    console.error(term(`${FAIL} Error checking React dependencies: ${error.message}`, {color: 'red'}))
    return false
  }
}
