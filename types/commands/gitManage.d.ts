import { Command } from './';
export declare class GitManage extends Command {
    prepare(): Promise<void>;
    execute(): Promise<void>;
    finalize(): Promise<void>;
    rollback(): Promise<void>;
}
