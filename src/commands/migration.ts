import { Command } from './'
import { DBTool } from '../lib/dbTool'
import { MIG_INIT_PROMPT } from '../constants/migrationPrompt'
import setting from '../../setting.json'

import type { MigInfo } from '../interfaces/dbTool'

export class Migration extends Command {
	private migInfo: MigInfo = {} as MigInfo
	private dbTool: DBTool = new DBTool()

	protected async prepare(): Promise<void> {
		MIG_INIT_PROMPT[0].choices = Object.keys(setting.dbConnection).map(connetionName => ({
			name: connetionName,
			value: connetionName
		}))
		Object.assign(this.migInfo, await this.Prompter.ask(MIG_INIT_PROMPT))
	}

	protected async execute(): Promise<void> {
		// 1. Local DB Connet
		await this.dbTool.connectLocalDB()

		// 2. Target DB Connet
		await this.dbTool.connectDB(this.migInfo.targetDB)
	}

	protected async finalize(): Promise<void> {
		// 1.
	}

	protected async rollback(): Promise<void> {}
}
