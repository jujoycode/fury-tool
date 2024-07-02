import type { Prompt } from '../lib'
import type { Logger } from '../utils'

export abstract class BaseCommand {
  protected prompt: Prompt
  protected logger: Logger
  protected sWorkDir: string

  constructor({ prompt, logger }: { prompt: Prompt; logger: Logger }) {
    this.prompt = prompt
    this.logger = logger
    this.sWorkDir = process.cwd()
  }

  protected abstract prepare(): Promise<void>
  protected abstract execute(): Promise<void>
  protected abstract finalize(): Promise<void>

  protected abstract rollback(errorContext: any): Promise<void>

  /**
   * @name runCommand
   * @desc Run the command and handle the lifecycle methods.
   * @example
   * new BaseCommand.invoke();
   */
  public async invoke() {
    try {
      await this.prepare()
      await this.execute()
      await this.finalize()
    } catch (error) {
      await this.rollback(error)
    }
  }

  protected setWorkDir(sWorkDir: string) {
    this.sWorkDir = sWorkDir
  }
}
