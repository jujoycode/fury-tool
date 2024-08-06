import { Command } from './'
import { SETTING_INIT_PROMPT, SETTING_LOGLEVEL_PROMPT, SETTING_DB_CONNECTION } from '../constants'

import setting from '../../setting.json'

import { SettingInfo, FurySetting } from '../interfaces/setting'
import { NoDataException } from '../exception'

export class Setting extends Command {
	private settingInfo: SettingInfo = {} as SettingInfo
	private furyInfo: FurySetting = {} as FurySetting
	private backupInfo: FurySetting = {} as FurySetting

	protected async prepare(): Promise<void> {
		// 1. setting.json 파일을 전역 변수에 등록
		this.furyInfo = structuredClone(setting) as FurySetting
		this.backupInfo = structuredClone(setting) as FurySetting

		// 2. 설정할 항목 선택 (prompt)
		Object.assign(this.settingInfo, await this.Prompter.ask(SETTING_INIT_PROMPT))
	}

	protected async execute(): Promise<void> {
		// 1. subCommand 확인 및 작업 시작
		switch (this.settingInfo.subCommand) {
			case 'logLevel': {
				await this.setLogLevel()
				break
			}

			case 'dbConnection': {
				await this.setDbConnection()
				break
			}
		}
	}

	protected async finalize(): Promise<void> {
		// 1. 검증 수행
		if (
			this.furyInfo[this.settingInfo.subCommand] === this.backupInfo[this.settingInfo.subCommand]
		) {
			// 1-1. 백업 객체와 변경 값이 일치할 시 warn 로그 작성 및 종료
			this.Logger.warn('Changed value matches the previous value. Undo.')
			return
		}

		if (!this.furyInfo[this.settingInfo.subCommand]) {
			// 1-2. 변경 값이 undefined, null, empty value 등일 경우 에러 처리
			throw new NoDataException(this.settingInfo.subCommand)
		}

		// 2. 패키지 경로 내 setting.json 파일 수정
		this.FileUtil.remove(this.FileUtil.makePath(__dirname, '../setting.json'))
		this.FileUtil.createFile(
			this.FileUtil.makePath(__dirname, '../'),
			'setting.json',
			JSON.stringify(this.furyInfo, null, 2)
		)
	}

	protected async rollback(): Promise<void> {
		// 0. backupInfo가 정상적으로 생성되어 있는지 검증
		if (Object.keys(this.backupInfo).length === 0) {
			// 0-1. 정상적이지 않다면, log 출력 후 종료
			this.Logger.info('backup object is empty, rollback process exit.')
			return
		}
		// 1. settting.json 파일 삭제 후 backupInfo 기준으로 재생성
		this.FileUtil.remove(this.FileUtil.makePath(__dirname, '../setting.json'))
		this.FileUtil.createFile(
			this.FileUtil.makePath(__dirname, '../'),
			'setting.json',
			JSON.stringify(this.backupInfo, null, 2)
		)
	}

	private async setLogLevel() {
		Object.assign(this.furyInfo, await this.Prompter.ask(SETTING_LOGLEVEL_PROMPT))
	}

	private async setDbConnection() {
		Object.keys(setting.dbConnection).map(connectionKey => {
			SETTING_DB_CONNECTION[0].choices.push({ name: connectionKey, value: connectionKey })
		})

		SETTING_DB_CONNECTION[0].choices.push({
			name: '✨ \x1b[33mNew\x1b[0m',
			value: 'new'
		})

		// Object.assign(this.furyInfo, await this.Prompter.ask(SETTING_LOGLEVEL_PROMPT))
		await this.Prompter.ask(SETTING_DB_CONNECTION)
	}
}
