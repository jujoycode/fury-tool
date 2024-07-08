import { Command } from './'
import { ProjectFactory } from '../factory'
import { PROJECT_INIT_PROMPT, USE_FRAMEWORK, USE_GIT } from '../constants'

import { ProjectInfo } from '../interfaces/project'

/**
 * @name InitProject
 * @desc Class representing the initialization of a project.
 */
export class InitProject extends Command {
  private projectInfo: ProjectInfo = {} as ProjectInfo
  private sWorkDir: string = ''

  /**
   * @name prepare
   * @desc Prepare the project by collecting user inputs.
   * @example
   * await command.prepare();
   */
  async prepare(): Promise<void> {
    // 0. Project 생성을 위한 기본 정보 취득 (prompt)
    const projectInitResponses = await this.Prompt.call(PROJECT_INIT_PROMPT)
    Object.assign(this.projectInfo, projectInitResponses)

    // 0-1. 필수값 검증
    const requiredField = PROJECT_INIT_PROMPT.map(prompt => String(prompt.name))
    this.CommonUtil.validateRequireFields(this.projectInfo, requiredField)

    // 0-2. Framework 종류 정보 취득 (prompt)
    if (this.projectInfo.useFramework) {
      const response = await this.Prompt.call(USE_FRAMEWORK)
      this.CommonUtil.validateRequireFields(
        response,
        USE_FRAMEWORK.map(prompt => String(prompt.name))
      )

      Object.assign(this.projectInfo, response)
    }

    // 0-3. git remote URL 정보 취득 (prompt)
    if (this.projectInfo.useGit) {
      const response = await this.Prompt.call(USE_GIT)
      this.CommonUtil.validateRequireFields(
        response,
        USE_GIT.map(prompt => String(prompt.name))
      )

      Object.assign(this.projectInfo, response)
    }

    this.Logger.space()
  }

  /**
   * @name execute
   * @desc Execute the project creation.
   * @example
   * await command.execute();
   */
  async execute(): Promise<void> {
    // 1. Factory 생성
    const factory = new ProjectFactory(this.projectInfo).getFactory()

    // 2. Project Setup
    await factory.setup()

    // 3. get project path
    this.sWorkDir = factory.getWorkDir()
  }

  /**
   * @name finalize
   * @desc Finalize the project creation process.
   * @example
   * await command.finalize();
   */
  async finalize(): Promise<void> {
    const spinner = this.Spinner.get()

    // 3. 후처리
    // -------------------------------------------------------
    // 3-1. Git 사용 여부에 따라 Init 수행
    if (this.projectInfo.useGit) {
      const gitRunner = spinner.start('Setup Git...')

      // 3-1-1. .gitignore 파일 생성
      await this.FileUtil.createFile(this.sWorkDir, '.gitignore', 'node_modules')

      try {
        // 3-1-2. git init 수행
        await this.Launcher.run('git', ['init'], this.sWorkDir)

        // 3-1-3. git remote add origin 수행
        await this.Launcher.run(
          'git',
          ['remote', 'add', 'origin', this.projectInfo.remoteUrl!],
          this.sWorkDir
        )

        gitRunner.succeed('Setup Git')
      } catch (error: any) {
        gitRunner.fail('Setup Git')
        this.Logger.error(error.message)
      }
    }

    // 3-2. prettier 사용 여부에 따라 .prettierrc.yaml 파일 생성
    if (this.projectInfo.usePrettier) {
      const prtRunner = spinner.start('Setup Prettier...')

      await this.FileUtil.createFile(this.sWorkDir, '.prettierrc.yaml', '')

      prtRunner.succeed('Setup Prettier')
    }

    // -------------------------------------------------------
    // 4. Package 설치
    const pkgRunner = spinner.start('Install...')

    await this.Launcher.run('pnpm', ['install'], this.sWorkDir)

    pkgRunner.succeed('Install')
  }

  /**
   * @name rollback
   * @desc Rollback the project creation in case of failure.
   * @example
   * await command.rollback();
   */
  async rollback(): Promise<void> {
    // 99. 에러가 발생한 지점 파악
    // 99-1. Roollback 사전 준비
    // 99-2. Rollback 수행
  }
}
