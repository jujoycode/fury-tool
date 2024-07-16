import { Factory } from './'
import { ProjectInfo } from '../interfaces/project'
export declare class ProjectFactory extends Factory {
  /**
   * @desc Constructor to initialize ProjectFactory with project information.
   * @param {ProjectInfo} projectInfo - The project information.
   */
  constructor(projectInfo: ProjectInfo)
  /**
   * @name setup
   * @desc setup the project with default settings.
   * @example
   * await factory.setup();
   */
  setup(): Promise<void>
  /**
   * @name setup
   * @desc return the project path
   * @example
   * factory.getWorkDir();
   */
  getWorkDir(): string
  /**
   * @name getFactory
   * @desc Get the specific factory based on the framework type.
   * @returns {BaseFactory} The specific project factory.
   * @example
   * const factory = new ProjectFactory(projectInfo).getFactory();
   */
  getFactory(): Factory
}
