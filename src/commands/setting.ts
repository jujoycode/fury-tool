import { FurySetting } from "../interfaces/setting";
import { Command } from "./";

import setting from '../../setting.json'

export class Setting extends Command {
    private furyInfo: FurySetting = {} as FurySetting
    private backupInfo: FurySetting = {} as FurySetting

    protected async prepare(): Promise<void> {
        // 1. setting.json 파일을 전역 변수에 등록
        this.furyInfo = structuredClone(setting) as FurySetting
        this.backupInfo = structuredClone(setting) as FurySetting

        // 2. 설정할 항목 선택 (prompt)
    }

    protected async execute(): Promise<void> {
        // 1. subCommand 확인 및 작업 시작

        // 
    }

    protected async finalize(): Promise<void> { }

    protected async rollback(): Promise<void> { }
}