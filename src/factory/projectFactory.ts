import { ProjectInfo } from "../interfaces/project";
import { BaseFactory, ReactProjectFactory, VueProjectFactory, ExpressProjectFactory } from './';

export class ProjectFactory extends BaseFactory {
  constructor(projectInfo: ProjectInfo) {
    super(projectInfo)
  }

  async build() {
    this.logger.info('Start Build with Plane')
  }

  public getFactory(): BaseFactory {
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