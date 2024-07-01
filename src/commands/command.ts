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

  abstract prepare(): Promise<void>
  abstract execute(): Promise<void>
  abstract finalize(): Promise<void>

  abstract rollback(): Promise<void>

  protected setWorkDir(sWorkDir: string) {
    this.sWorkDir = sWorkDir
  }
}
