import { Command } from './';
export declare class GitManage extends Command {
    private gitInfo;
    private sWorkDir;
    /**
   * @name prepare
   * @desc Prepare the project by collecting user inputs.
   * @example
   * await command.prepare();
   */
    prepare(): Promise<void>;
    /**
   * @name execute
   * @desc Execute the project creation.
   * @example
   * await command.execute();
   */
    execute(): Promise<void>;
    /**
   * @name finalize
   * @desc Finalize the project creation process.
   * @example
   * await command.finalize();
   */
    finalize(): Promise<void>;
    /**
   * @name rollback
   * @desc Rollback the project creation in case of failure.
   * @example
   * await command.rollback();
   */
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
