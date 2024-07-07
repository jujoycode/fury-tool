import { Factory, ReactProjectFactory, VueProjectFactory, ExpressProjectFactory } from './'
import { jsPackageJson, tsPackageJson, tsConfig, baseStructure } from '../templates'

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
   * @name setup
   * @desc setup the project with default settings.
   * @example
   * await factory.setup();
   */
  public async setup() {
    // 1. Directory 생성
    const sWorkPath = await this.FileUtil.createDirectory(
      this.sWorkDir,
      this.projectInfo.projectName
    )

    // 2. 프로젝트 구조 생성
    const packageJson = this.projectInfo.useTypescript ? tsPackageJson : jsPackageJson
    const structureJson = this.projectInfo.useTypescript
      ? baseStructure.typescript
      : baseStructure.default

    packageJson.name = this.projectInfo.projectName

    // 2-1. package.json 생성
    await this.FileUtil.createFile(sWorkPath, 'package.json', JSON.stringify(packageJson, null, 2))
    if (this.projectInfo.useTypescript) {
      // 2-2. tsconfig.json 생성
      await this.FileUtil.createFile(sWorkPath, 'tsconfig.json', JSON.stringify(tsConfig, null, 2))
    }

    // 2-3. 프로젝트 구조 생성
    await this.FileUtil.createStructure(structureJson, sWorkPath)

    // 2-4. 프로젝트 경로 저장
    this.setWorkDir(sWorkPath)
  }

  /**
   * @name setup
   * @desc return the project path
   * @example
   * factory.getWorkDir();
   */
  public getWorkDir(): string {
    return this.sWorkDir
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
