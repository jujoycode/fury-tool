import { Command } from "./";
export declare class Setting extends Command {
    private furyInfo;
    private backupInfo;
    protected prepare(): Promise<void>;
    protected execute(): Promise<void>;
    protected finalize(): Promise<void>;
    protected rollback(): Promise<void>;
}
