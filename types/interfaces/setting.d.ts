interface SettingInfo {
    subCommand: 'logLevel' | 'dbConnection';
}
interface FurySetting {
    logLevel: 'error' | 'info' | 'warn' | 'debug' | 'trace';
}
export { SettingInfo, FurySetting };
