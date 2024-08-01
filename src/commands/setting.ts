import { Command } from './'
import { SETTING_INIT_PROMPT, SETTING_LOGLEVEL_PROMPT } from '../constants'

import setting from '../../setting.json'

import { SettingInfo, FurySetting } from '../interfaces/setting'

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
				Object.assign(this.settingInfo, await this.Prompter.ask(SETTING_LOGLEVEL_PROMPT))

				this.Logger.info(JSON.stringify(this.settingInfo, null, 2))
				break
			}

			case 'dbConnection': {
				break
			}
		}
	}

	protected async finalize(): Promise<void> {
		// 1. 검증 수행 (백업 객체와 비교했을 때, subCommand 객체만 변경되었는지 확인)
		// 1-1. 백업 객체와 일치할 시 warn 로그 작성
		// 1-2. 변경 값이 undefined 등일 경우 에러 처리
		// 2. 패키지 경로 내 setting.json 파일 수정
		// 2-1. setting.json 파일 삭제
		this.FileUtil.remove(this.FileUtil.makePath(__dirname, '../setting.json'))
		// 2-2. setting.json 재생성
		this.FileUtil.createFile(
			this.FileUtil.makePath(__dirname, '../'),
			'setting.json',
			JSON.stringify(this.settingInfo, null, 2)
		)
	}

	protected async rollback(): Promise<void> {
		//
	}
}
