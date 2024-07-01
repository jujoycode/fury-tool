#!/usr/bin/env node

import { name, version, description } from '../package.json'
import { Command } from 'commander'
import { Prompt } from './lib'
import { Logger } from './utils'
import { BaseCommand, InitProject } from './commands'

class App {
  private program: Command
  private prompt: Prompt
  private logger: Logger

  constructor() {
    this.program = new Command()
    this.prompt = new Prompt()
    this.logger = Logger.getInstance()

    this.parsingCommand()
  }

  private parsingCommand() {
    const objCommandParams = { prompt: this.prompt, logger: this.logger }

    this.program
      .name(name)
      .option('no option', 'Start create project')
      .option('-g, --git', 'Start git management', false)
      .version(version)
      .description(description)
      .action(options => {
        switch (options) {
          case options.git: {
            // this.runCommand(new GitManage())
            break
          }

          default: {
            this.runCommand(new InitProject(objCommandParams))
            break
          }
        }
      })
  }

  private async runCommand(command: BaseCommand) {
    try {
      await command.prepare()
      await command.execute()
      await command.finalize()
    } catch (error: any) {
      this.logger.space()
      this.logger.error(`${error.message}`)

      await command.rollback()
    }
  }

  public run() {
    this.program.parse(process.argv)
  }
}

new App().run()
