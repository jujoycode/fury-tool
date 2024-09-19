import SQL from 'mysql2/promise'
import setting from '../../setting.json'

import { DBEngine, DBInfo } from '../interfaces/dbTool'

export class DBTool {
	private engine: DBEngine
	public localConnection?: SQL.Connection
	public connection?: SQL.Connection

	constructor(engine?: DBEngine) {
		this.engine = engine ? engine : 'mysql'
	}

	private async createConnection(connectionName: string): Promise<SQL.Connection> {
		const dbCollection = structuredClone(setting.dbConnection) as { [key: string]: DBInfo }
		const dbInfo = dbCollection[connectionName]

		switch (this.engine) {
			case 'mysql': {
				const pool = SQL.createPool(dbInfo)
				return await pool.getConnection()
			}

			default: {
				throw new Error('This DB engine is not supported.')
			}
		}
	}

	public async connectLocalDB() {
		this.localConnection = await this.createConnection('local')
	}

	public async connectDB(connectionName: string) {
		this.connection = await this.createConnection(connectionName)
	}
}
