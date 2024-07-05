import { Factory, ReactProjectFactory, VueProjectFactory, ExpressProjectFactory } from './'
import { OperationFailException } from '../exception'

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

    // 2. 설정 파일 생성
    await this.FileUtil.createFile(
      sWorkPath,
      'package.json',
      JSON.stringify(jsPackageJson, null, 2)
    )
    if (this.projectInfo.useTypescript) {
      await this.FileUtil.createFile(
        sWorkPath,
        'tsconfig.json',
        JSON.stringify(tsPackageJson, null, 2)
      )
    }

    // 3. 프로젝트 기본 구조 생성
    // 3-1. src 폴더 생성
    const sSrcPath = await this.FileUtil.createDirectory(sWorkPath, 'src')

    // 3-2. index.js 파일 생성
    await this.FileUtil.createFile(sSrcPath, 'index.js', '')

    // 3-3. utils 폴더 생성
    const sUtilPath = await this.FileUtil.createDirectory(sWorkPath, 'utils')

    // 3-4. projectUtil.js 파일 생성
    await this.FileUtil.createFile(sUtilPath, 'projectUtil.js', '')
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
