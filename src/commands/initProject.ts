import { BaseCommand } from './'
import { ProjectFactory } from '../factory'
import { PROJECT_INIT, USE_FRAMEWORK } from '../constants'

import { ProjectInfo } from '../interfaces/project'

export class InitProject extends BaseCommand {
  private projectInfo = {} as ProjectInfo

  async prepare(): Promise<void> {
    this.logger.space()

    // 0. Project 생성을 위한 기본 정보 취득 (prompt)
    await this.prompt.call(PROJECT_INIT).then(res => {
      Object.assign(this.projectInfo, res)
    })

    // 0-1. Framework 종류 정보 취득 (prompt)
    if (this.projectInfo.useFramework) {
      await this.prompt.call(USE_FRAMEWORK).then(res => {
        Object.assign(this.projectInfo, res)
      })
    }

    // 0-2. Git 사용 여부 취득

    this.logger.space()
  }

  async execute(): Promise<void> {
    // 1. Factory 생성
    const factory = new ProjectFactory(this.projectInfo).getFactory()

    // 2. Build 수행
    await factory.build()

    // 3. 기타 설정파일 생성 (tsconfig.json / .prettierrc.yaml / .gitignore)
  }

  async finalize(): Promise<void> {
    // 3. Git 사용 여부에 따라 Init 수행

    // 4. Package 설치
  }

  async rollback(): Promise<void> {
    // 0. 에러가 발생한 지점 파악

    // 1. Roollback 사전 준비

    // 2. Rollback 수행
  }
}
