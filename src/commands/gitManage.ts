import { Command } from './'
import { GIT_INIT_PROMPT, CONFIRM_ADDITION_SETTING } from '../constants'
import { GitException, AlreadyExistException } from '../exception'

import { GitInfo } from '../interfaces/git'

export class GitManage extends Command {
  private gitInfo: GitInfo = {} as GitInfo
  private sWorkDir: string = process.cwd()

  async prepare(): Promise<void> {
    // 0. Child Command 선택
    const gitInitResponse = await this.Prompt.call(GIT_INIT_PROMPT)
    this.CommonUtil.validateRequireFields(
      gitInitResponse,
      GIT_INIT_PROMPT.map(prompt => String(prompt.name))
    )

    Object.assign(this.gitInfo, gitInitResponse)

    // 1. init을 제외한 커맨드에서 validation 수행
    if (this.gitInfo.subCommand !== 'init') {
      await this.checkValidation()
    }
  }

  async execute(): Promise<void> {
    switch (this.gitInfo.subCommand) {
      case 'init': {
        await this.initGit()
        break
      }

      case 'push': {
        await this.pushGit()
        break
      }

      case 'pull': {
        await this.pullGit()
        break
      }

      case 'merge': {
        await this.mergeGit()
        break
      }
    }
  }

  async finalize(): Promise<void> {}

  async rollback(): Promise<void> {
    // 99. 에러가 발생한 지점 파악
    // 99-1. Roollback 사전 준비
    // 99-2. Rollback 수행
  }

  /**
   * @name checkValidation
   * @desc Checks for the existence of the .git directory and throws an error if it does not exist.
   * @example await this.checkValidation();
   */
  private async checkValidation() {
    const checkRunner = this.Spinner.get().start('🔎  Verifying project setup...')

    // 0. git 설치 여부 검증
    try {
      await this.Launcher.run('git', ['-v'])
    } catch (error) {
      throw new GitException('notInstall')
    }

    // 1. .git 파일 존재 검증
    const sPath = this.FileUtil.makePath(this.sWorkDir, '.git')
    const bCheckFlag = await this.FileUtil.checkExist(sPath)

    if (!bCheckFlag) {
      checkRunner.fail()
      throw new GitException('init')
    }

    checkRunner.succeed('Project setup verified.')
  }

  /**
   * @name initGit
   * @desc Performs Git initialization.
   * @example await this.initGit();
   */
  private async initGit() {
    // 0. git이 설치되어있지 않거나 .git이 이미 존재하는 프로젝트라면 예외 처리
    try {
      await this.Launcher.run('git', ['-v'])
    } catch (error) {
      throw new GitException('notInstall')
    }

    const sPath = this.FileUtil.makePath(this.sWorkDir, '.git')
    if (await this.FileUtil.checkExist(sPath)) {
      throw new AlreadyExistException('.git')
    }

    // 1. git init 명령어 수행
    await this.Launcher.run('git', ['init'])

    // 2. remote repo 추가, first commit 수행 여부 확인
    const response = await this.Prompt.call(CONFIRM_ADDITION_SETTING)
    this.CommonUtil.validateRequireFields(
      response,
      CONFIRM_ADDITION_SETTING.map(prompt => String(prompt.name))
    )
    Object.assign(this.gitInfo, response)

    // 3. remote origin 설정
    this.Launcher.run('git', ['remote', 'add', 'origin', this.gitInfo.remoteUrl])

    if (this.gitInfo.useFirstCommit) {
      // 4. first commit 수행
      await this.Launcher.run('git', ['add', '.'])
      await this.Launcher.run('git', ['commit', '-m', ':sparkles: Project Initial'])
      await this.Launcher.run('git', ['push', '-u', 'origin', 'master'])
    }
  }

  /**
   * @name pushGit
   * @desc Performs Git push operation.
   * @example await this.pushGit();
   */
  private async pushGit() {
    // Logic for Git push operation
  }

  /**
   * @name pullGit
   * @desc Performs Git pull operation.
   * @example await this.pullGit();
   */
  private async pullGit() {
    // Logic for Git pull operation
  }

  /**
   * @name mergeGit
   * @desc Performs Git merge operation.
   * @example await this.mergeGit();
   */
  private async mergeGit() {
    // Logic for Git merge operation
  }
}
