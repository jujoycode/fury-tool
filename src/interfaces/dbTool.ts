type DBEngine = 'mysql'

interface DBInfo {
	host: string
	database: string
	user: string
	password: string
	pemPath?: string
}

interface MigInfo {
	targetDB: string
}

export { DBEngine, DBInfo, MigInfo }
