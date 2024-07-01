import { mkdirSync } from 'fs'
import { join } from 'path'

export class FileUtil {
  constructor() { }

  static makePath(sRootPath: string, sTargetPath: string) {
    return join(sRootPath, sTargetPath)
  }

  static async createDirectory(sWorkDir: string, sDirName: string) {
    const sPath = join(sWorkDir, sDirName)
    mkdirSync(sPath, { recursive: true })
  }
}