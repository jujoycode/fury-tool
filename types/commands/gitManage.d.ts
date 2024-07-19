import { Command } from './';
export declare class GitManage extends Command {
    private gitInfo;
    private sWorkDir;
    /**
     * @name prepare
     * @desc Prepares the project by collecting user inputs.
     * This method is responsible for gathering necessary inputs from the user
     * before executing any Git commands.
     * @example
     * await command.prepare();
     */
    prepare(): Promise<void>;
    /**
     * @name execute
     * @desc Executes the appropriate Git command based on the user input.
     * This method determines which Git command to execute (init, push, pull, merge, branch)
     * based on the user input collected during the prepare phase.
     * @example
     * await command.execute();
     */
    execute(): Promise<void>;
    /**
     * @name finalize
     * @desc Finalizes the project creation process.
     * This method is reserved for any cleanup or final steps that need to be
     * executed after the main Git commands have been run.
     * @example
     * await command.finalize();
     */
    finalize(): Promise<void>;
    /**
     * @name rollback
     * @desc Rolls back the project creation in case of failure.
     * This method is responsible for undoing any changes made during the execution
     * of the Git commands if an error occurs.
     * @example
     * await command.rollback();
     */
    rollback(): Promise<void>;
    /**
     * @name checkValidation
     * @desc Checks for the existence of the .git directory and validates the Git setup.
     * This method verifies if Git is installed and, if a 'hard' check is requested,
     * ensures that the current directory is a Git repository.
     * @param {string} [type] - The type of validation to perform ('hard' for full validation).
     * @example
     * await this.checkValidation();
     * await this.checkValidation('hard');
     */
    private checkValidation;
    /**
     * @name initGit
     * @desc Initializes a new Git repository.
     * This method performs Git initialization, sets up the remote origin, and optionally
     * makes the first commit and pushes it to the remote repository.
     * @example
     * await this.initGit();
     */
    private initGit;
    /**
     * @name pushGit
     * @desc Performs a Git push operation.
     * This method stages all changes, commits them with a user-provided message,
     * and pushes the commit to the remote repository if the user has granted push permission.
     * @example
     * await this.pushGit();
     */
    private pushGit;
    /**
     * @name pullGit
     * @desc Performs a Git pull operation.
     * This method pulls the latest changes from the remote repository for the current branch,
     * ensuring that the remote branch exists before attempting to pull.
     * @example
     * await this.pullGit();
     */
    private pullGit;
    /**
     * @name mergeGit
     * @desc Performs a Git merge operation.
     * This method merges a selected branch into the current branch. If the target branch is a remote branch,
     * it first pulls the latest changes from the remote. If merge conflicts occur, it prompts the user to resolve them.
     * @example
     * await this.mergeGit();
     */
    private mergeGit;
    /**
     * @name branchManage
     * @desc Manages Git branches (change, create, rename, delete).
     * This method handles various branch-related operations, prompting the user for
     * necessary information and executing the corresponding Git commands.
     * @example
     * await this.branchManage();
     */
    private branchManage;
    /**
     * @name getBranchList
     * @desc Retrieves the list of branches.
     * This method retrieves either the current branch or all branches, depending on the provided type.
     * @param {'current' | 'all'} type - The type of branch list to retrieve ('current' for the current branch, 'all' for all branches).
     * @returns {Promise<string>} - The list of branches as a string.
     * @example
     * const currentBranch = await this.getBranchList('current');
     * const allBranchList = await this.getBranchList('all');
     */
    private getBranchList;
}
