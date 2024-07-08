import type { Prompt, Spinner } from '../lib'
import type { Logger, CommonUtil, FileUtil } from '../utils'
import type { Exception } from '../exception'

export abstract class Command {
  protected Prompt: Prompt
  protected Logger: Logger
  protected Spinner: Spinner

  protected CommonUtil: typeof CommonUtil
  protected FileUtil: typeof FileUtil

  constructor({
    prompt,
    logger,
    spinner,
    utils
  }: {
    prompt: Prompt
    logger: Logger
    spinner: Spinner
    utils: { CommonUtil: typeof CommonUtil; FileUtil: typeof FileUtil }
  }) {
    this.Prompt = prompt
    this.Logger = logger
    this.Spinner = spinner
    this.CommonUtil = utils.CommonUtil
    this.FileUtil = utils.FileUtil
  }

  protected abstract prepare(): Promise<void>
  protected abstract execute(): Promise<void>
  protected abstract finalize(): Promise<void>

  protected abstract rollback(): Promise<void>

  /**
   * @name invoke
   * @desc Invoke the command and handle the lifecycle methods.
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
      this.Logger.errorD(err)

      await this.rollback()
    }
  }
}
