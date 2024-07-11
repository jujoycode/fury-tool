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

  async rollback(): Promise<void> {}

  /**
   * @name checkGitFile
   * @desc .git 파일 유무 확인 후 존재하지 않을 시 에러 처리
   * @example await this.checkGitFile()
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
}
