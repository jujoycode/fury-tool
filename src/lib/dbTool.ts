import SQL from 'mysql2/promise'
import setting from '../../setting.json'

import { DBEngine, DBInfo } from '../interfaces/dbTool'

export class DBTool {
	private engine: DBEngine
	private localConnection?: SQL.Connection

	constructor(engine?: DBEngine) {
		this.engine = engine ? engine : 'mysql'
	}

	public async connectLocalDB() {
		this.localConnection = await this.createConnection('local')
	}

	public async createConnection(connectionName: string): Promise<SQL.Connection> {
		const dbCollection = structuredClone(setting.dbConnection) as { [key: string]: DBInfo }
		const dbInfo = dbCollection[connectionName]

		switch (this.engine) {
			case 'mysql': {
				const pool = SQL.createPool(dbInfo)

				return await pool.getConnection()
			}

			default: {
				throw new Error('지원하지 않는 DB Engine 입니다.')
			}
		}
	}
}
