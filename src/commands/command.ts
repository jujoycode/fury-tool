import type { Prompt } from '../lib'
import type { Logger } from '../utils'

export abstract class BaseCommand {
  protected prompt: Prompt
  protected logger: Logger

  constructor({ prompt, logger }: { prompt: Prompt; logger: Logger }) {
    this.prompt = prompt
    this.logger = logger
  }

  abstract prepare(): Promise<void>
  abstract execute(): Promise<void>
  abstract finalize(): Promise<void>

  abstract rollback(): Promise<void>
}
