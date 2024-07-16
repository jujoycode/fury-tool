import { Command } from './'
/**
 * @name InitProject
 * @desc Class representing the initialization of a project.
 */
export declare class InitProject extends Command {
  private projectInfo
  private sWorkDir
  /**
   * @name prepare
   * @desc Prepare the project by collecting user inputs.
   * @example
   * await command.prepare();
   */
  prepare(): Promise<void>
  /**
   * @name execute
   * @desc Execute the project creation.
   * @example
   * await command.execute();
   */
  execute(): Promise<void>
  /**
   * @name finalize
   * @desc Finalize the project creation process.
   * @example
   * await command.finalize();
   */
  finalize(): Promise<void>
  /**
   * @name rollback
   * @desc Rollback the project creation in case of failure.
   * @example
   * await command.rollback();
   */
  rollback(): Promise<void>
}
