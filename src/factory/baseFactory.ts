import { ProjectInfo } from '../interfaces/project'
import { Logger } from '../utils'

/**
 * @name BaseFactory
 * @desc Abstract class representing a base factory for project creation.
 */
export abstract class BaseFactory {
  protected logger: Logger
  protected projectInfo: ProjectInfo

  /**
   * @desc Constructor to initialize BaseFactory with project information.
   * @param {ProjectInfo} projectInfo - The project information.
   */
  constructor(projectInfo: ProjectInfo) {
    this.logger = Logger.getInstance()
    this.projectInfo = projectInfo
  }

  /**
   * @name build
   * @desc Abstract method to build the project.
   * @example
   * await factory.build();
   */
  abstract build(): Promise<void>
}
