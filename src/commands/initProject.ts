import { BaseCommand } from './'
import { ProjectFactory } from '../factory'
import { PROJECT_INFO, PROJECT_INIT_PROMPT, USE_FRAMEWORK } from '../constants'

import { ProjectInfo } from '../interfaces/project'
import { CommonUtil } from '../utils/commonUtil'

/**
 * @name InitProject
 * @desc Class representing the initialization of a project.
 */
export class InitProject extends BaseCommand {
  private projectInfo: ProjectInfo = {} as ProjectInfo

  /**
   * @name prepare
   * @desc Prepare the project by collecting user inputs.
   * @example
   * await command.prepare();
   */
  async prepare(): Promise<void> {
    this.logger.space()

    // 0. Project 생성을 위한 기본 정보 취득 (prompt)
    const projectInitResponses = await this.prompt.call(PROJECT_INIT_PROMPT)
    Object.assign(this.projectInfo, projectInitResponses)

    // 0-1. 필수값 검증
    CommonUtil.validateRequireFields(this.projectInfo, PROJECT_INFO)

    // 0-2. Framework 종류 정보 취득 (prompt)
    if (this.projectInfo.useFramework) {
      const response = await this.prompt.call(USE_FRAMEWORK)
      CommonUtil.validateRequireFields(response, ['frameworkType'])

      Object.assign(this.projectInfo, response)
    }
  }

  /**
   * @name execute
   * @desc Execute the project creation.
   * @example
   * await command.execute();
   */
  async execute(): Promise<void> {
    // 1. Factory 생성
    const projectFactory = new ProjectFactory(this.projectInfo).getFactory()

    // 2. Build 수행
    await projectFactory.build()

    // 3. 기타 설정파일 생성 (tsconfig.json / .prettierrc.yaml / .gitignore)
  }

  /**
   * @name finalize
   * @desc Finalize the project creation process.
   * @example
   * await command.finalize();
   */
  async finalize(): Promise<void> {
    // 4. Git 사용 여부에 따라 Init 수행
    // 5. Package 설치
  }

  /**
   * @name rollback
   * @desc Rollback the project creation in case of failure.
   * @example
   * await command.rollback();
   */
  async rollback(errorContext: any): Promise<void> {
    this.logger.error(errorContext)

    // 99. 에러가 발생한 지점 파악
    // 99-1. Roollback 사전 준비
    // 99-2. Rollback 수행
  }
}
