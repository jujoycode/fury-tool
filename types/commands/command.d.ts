import type { Prompt } from '../lib';
import type { Logger, CommonUtil, FileUtil } from '../utils';
export declare abstract class Command {
    protected Prompt: Prompt;
    protected Logger: Logger;
    protected CommonUtil: typeof CommonUtil;
    protected FileUtil: typeof FileUtil;
    constructor({ prompt, logger, utils }: {
        prompt: Prompt;
        logger: Logger;
        utils: {
            CommonUtil: typeof CommonUtil;
            FileUtil: typeof FileUtil;
        };
    });
    protected abstract prepare(): Promise<void>;
    protected abstract execute(): Promise<void>;
    protected abstract finalize(): Promise<void>;
    protected abstract rollback(): Promise<void>;
    /**
     * @name invoke
     * @desc Invoke the command and handle the lifecycle methods.
     * @example
     * new BaseCommand.invoke();
     */
    invoke(): Promise<void>;
}
