import { Command } from './'
import { GIT_INIT_PROMPT } from '../constants'
import { GitException } from '../exception'

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
      await this.checkGitFile()
    }
  }

  async execute(): Promise<void> {
    switch (this.gitInfo.subCommand) {
      case 'init': {
        break
      }

      case 'push': {
        break
      }

      case 'pull': {
        break
      }

      case 'merge': {
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
   * @name checkGitFile
   * @desc Checks for the existence of the .git directory and throws an error if it does not exist.
   * @example await this.checkGitFile();
   */
  private async checkGitFile() {
    const checkRunner = this.Spinner.get().start('🔎  Verifying project setup...')

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
    // 0. git이 설치되어있는지 확인
    // 1. git init 명령어 수행
    // 2. first commit 여부 확인
    // 2-1. commit 수행
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
