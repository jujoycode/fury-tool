import { Command } from "./";
export declare class Migration extends Command {
    protected prepare(): Promise<void>;
    protected execute(): Promise<void>;
    protected finalize(): Promise<void>;
    protected rollback(): Promise<void>;
}
