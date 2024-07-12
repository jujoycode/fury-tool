import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

import { OperationFailException } from '../exception'

export class FileUtil {
  constructor() {}

  static makePath(sRootPath: string, sTargetPath: string): string {
    return join(sRootPath, sTargetPath)
  }

  static async checkExist(sTargetPath: string): Promise<boolean> {
    return existsSync(sTargetPath)
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
      throw new OperationFailException('createDirectory', error)
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

  static async createStructure(folderStructure: Record<string, any>, sPath: string): Promise<void> {
    for (const key in folderStructure) {
      const value = folderStructure[key]

      // 값이 문자열인 경우 파일 생성
      if (typeof value === 'string') {
        await this.createFile(sPath, `${key}.${value}`, '') // 빈 파일 생성
      }

      // 값이 객체인 경우 폴더 생성 및 재귀 호출
      if (typeof value === 'object') {
        await this.createDirectory(sPath, key)
        await FileUtil.createStructure(value, this.makePath(sPath, key))
      }
    }
  }
}
