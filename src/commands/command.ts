import type { Prompt } from '../lib'
import type { Logger } from '../utils'
import type { Exception } from '../exception'

export abstract class Command {
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

  protected abstract rollback(): Promise<void>

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
    } catch (errorContext: unknown) {
      const err = errorContext as Exception
      this.logger.errorD(err)

      await this.rollback()
    }
  }

  protected setWorkDir(sWorkDir: string) {
    this.sWorkDir = sWorkDir
  }
}
