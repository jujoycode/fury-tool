import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

import { OperationFailException, NoDataException } from '../exception'
import yaml from 'js-yaml'

export class FileUtil {
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

	static readFile(sTargetPath: string): string {
		const isExist = this.checkExist(sTargetPath)

		if (!isExist) {
			throw new NoDataException('fileName')
		}

		try {
			const fileContents = readFileSync(sTargetPath, 'utf8')
			return fileContents
		} catch (err) {
			console.error(err)
			throw new Error('Failed to read file')
		}
	}

	static yamlConvertToJsObject(sTargetPath: string): unknown {
		try {
			// yaml 데이터를 자바스크립트 객체로 변환
			return yaml.load(this.readFile(sTargetPath))
		} catch (err) {
			console.log(err)
			throw new Error('Failed to convert file')
		}
	}
}
