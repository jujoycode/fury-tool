type DBEngine = 'mysql'

interface DBInfo {
	host: string
	database: string
	user: string
	password: string
	pemPath?: string
}

export { DBEngine, DBInfo }
