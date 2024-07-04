import { Factory, ReactProjectFactory, VueProjectFactory, ExpressProjectFactory } from './'
import { OperationFailException } from '../exception'

import { ProjectInfo } from '../interfaces/project'

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

    try {
      // 1. Directory 생성
      await this.FileUtil.createDirectory(this.sWorkDir, this.projectInfo.projectName)

      const sWorkPath = this.FileUtil.makePath(this.sWorkDir, this.projectInfo.projectName)

      // 2. 설정 파일 생성
      await this.FileUtil.createFile(sWorkPath, 'package.json', '')
      if (this.projectInfo.useTypescript) {
        await this.FileUtil.createFile(sWorkPath, 'tsconfig.json', '')
      }

      // 3.

      // 4.
    } catch (error: any) {
      this.logger.errorD(error)
      throw new OperationFailException('projectBuild')
    }
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
