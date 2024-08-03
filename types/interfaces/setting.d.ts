interface SettingInfo {
    subCommand: 'logLevel' | 'dbConnection';
    logLevel: 'error' | 'info' | 'warn' | 'debug' | 'trace';
    dbConnection: {
        host: string;
        schema: string;
        username: string;
        password: string;
        pemKey?: undefined;
    };
}
interface FurySetting {
    logLevel: 'error' | 'info' | 'warn' | 'debug' | 'trace';
    dbConnection: {};
}
export { SettingInfo, FurySetting };
