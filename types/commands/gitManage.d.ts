import { Command } from './';
export declare class GitManage extends Command {
    private gitInfo;
    private sWorkDir;
    prepare(): Promise<void>;
    execute(): Promise<void>;
    finalize(): Promise<void>;
    rollback(): Promise<void>;
    /**
     * @name checkValidation
     * @desc Checks for the existence of the .git directory and throws an error if it does not exist.
     * @example await this.checkValidation();
     */
    private checkValidation;
    /**
     * @name initGit
     * @desc Performs Git initialization.
     * @example await this.initGit();
     */
    private initGit;
    /**
     * @name pushGit
     * @desc Performs Git push operation.
     * @example await this.pushGit();
     */
    private pushGit;
    /**
     * @name pullGit
     * @desc Performs Git pull operation.
     * @example await this.pullGit();
     */
    private pullGit;
    /**
     * @name mergeGit
     * @desc Performs Git merge operation.
     * @example await this.mergeGit();
     */
    private mergeGit;
    /**
     * @name branchManage
     * @desc Performs related to Git Branch management.
     * @example await this.branchManage()
     */
    private branchManage;
}
