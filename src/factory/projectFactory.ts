import { ProjectInfo } from '../interfaces/project'
import { Factory, ReactProjectFactory, VueProjectFactory, ExpressProjectFactory } from './'

export class ProjectFactory extends Factory {
  /**
   * @desc Constructor to initialize ProjectFactory with project information.
   * @param {ProjectInfo} projectInfo - The project information.
   */
  constructor(projectInfo: ProjectInfo) {
    super(projectInfo)
  }

  /**
   * @name build
   * @desc Build the project with default settings.
   * @example
   * await factory.build();
   */
  async build() {
    this.logger.info('Build Start (Default)')
  }

  /**
   * @name getFactory
   * @desc Get the specific factory based on the framework type.
   * @returns {BaseFactory} The specific project factory.
   * @example
   * const factory = new ProjectFactory(projectInfo).getFactory();
   */
  public getFactory(): Factory {
    switch (this.projectInfo?.frameworkType) {
      case 'react': {
        return new ReactProjectFactory(this.projectInfo)
      }

      case 'vue': {
        return new VueProjectFactory(this.projectInfo)
      }

      case 'express': {
        return new ExpressProjectFactory(this.projectInfo)
      }

      default: {
        return this
      }
    }
  }
}
