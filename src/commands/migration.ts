import { Command } from "./";

export class Migration extends Command {

    protected async prepare(): Promise<void> {
        // 1. 
    }

    protected async execute(): Promise<void> {
        // 1. 
    }

    protected async finalize(): Promise<void> {
        // 1.
    }

    protected async rollback(): Promise<void> { }
}