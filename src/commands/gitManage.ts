import { Command } from './'

export class GitManage extends Command {
  async prepare(): Promise<void> {
    const run = this.Spinner.get()

    // 0. .git 파일 존재 검증
    run.start('🫠  Check consistency...')
    this.Logger.error('🚨  This Project not use git')
    run.succeed('🫠  Check consistency')

    // 1. 명령어
  }

  async execute(): Promise<void> {}

  async finalize(): Promise<void> {}

  async rollback(): Promise<void> {}
}
