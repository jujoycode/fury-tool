import SQL from 'mysql2/promise';
import { DBEngine } from '../interfaces/dbTool';
export declare class DBTool {
    private engine;
    localConnection?: SQL.Connection;
    connection?: SQL.Connection;
    constructor(engine?: DBEngine);
    private createConnection;
    connectLocalDB(): Promise<void>;
    connectDB(connectionName: string): Promise<void>;
}
