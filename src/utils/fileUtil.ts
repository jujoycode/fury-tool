import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

import { Logger } from './logger'
import { OperationFailException } from '../exception'

export class FileUtil {
  constructor() {}

  static makePath(sRootPath: string, sTargetPath: string): string {
    return join(sRootPath, sTargetPath)
  }

  static async createDirectory(
    sWorkDir: string,
    sDirName: string,
    option?: { recursive: boolean }
  ): Promise<string> {
    try {
      const sPath = join(sWorkDir, sDirName)
      mkdirSync(sPath, { recursive: option?.recursive ? option.recursive : false })

      await this.checkExist(sPath)

      return sPath
    } catch (error: any) {
      throw new OperationFailException('createDirectory')
    }
  }

  static async createFile(
    sWorkDir: string,
    sFileName: string,
    fileData: string | Buffer
  ): Promise<boolean> {
    const sPath = join(sWorkDir, sFileName)
    writeFileSync(sPath, fileData)

    return this.checkExist(sPath)
  }

  static async checkExist(sTargetPath: string): Promise<boolean> {
    return existsSync(sTargetPath)
  }
}
