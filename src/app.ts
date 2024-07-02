#!/usr/bin/env node

import { Command as Commander } from 'commander'
import { BaseCommand, InitProject } from './commands'
import { Prompt } from './lib'
import { Logger } from './utils'

import { name, version, description } from '../package.json'

/**
 * @name App
 * @desc Main application class for the CLI tool.
 */
class App {
  private program: Commander
  private prompt: Prompt
  private logger: Logger

  /**
   * @desc Constructor to initialize the App with the prompt library.
   */
  constructor() {
    this.program = new Commander()
    this.prompt = new Prompt()
    this.logger = Logger.getInstance()
    this.configureCommands()
  }

  /**
   * @name configureCommands
   * @desc Configure the commands for the CLI application.
   * @example
   * this.configureCommands();
   */
  private async configureCommands() {
    const objCommandParams = { prompt: this.prompt, logger: this.logger }

    this.program
      .name(name)
      .option('no option', 'Start create project')
      .option('-g, --git', 'Start git management', false)
      .version(version)
      .description(description)
      .action(async options => {
        switch (options) {
          case options.git: {
            this.logger.info('Git management is not implemented yet.')
            break
          }

          default: {
            await this.runCommand(new InitProject(objCommandParams))
          }
        }
      })
  }

  /**
   * @name runCommand
   * @desc Run the given command and handle the lifecycle methods.
   * @param {InitProject} command - The command to run.
   * @example
   * this.runCommand(new InitProject(params));
   */
  private async runCommand(command: BaseCommand) {
    try {
      this.logger.debug('Running command...')

      await command.prepare()
      await command.execute()
      await command.finalize()

      this.logger.debug('Command executed successfully.')
    } catch (error) {
      await command.rollback()
    }
  }

  /**
   * @name run
   * @desc Parse the command line arguments and start the CLI application.
   * @example
   * app.run();
   */
  public run() {
    this.program.parse(process.argv)
  }
}

// Start the application
new App().run()
