#!/usr/bin/env node

import { Command as Commander } from 'commander'
import { InitProject } from './commands'
import { Prompt } from './lib'
import { Logger } from './utils'

import { name, version, description } from '../package.json'
import { FuryOption } from './interfaces/project'

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
    this.program
      .name(name)
      .option('no option', 'Start create project')
      .option('-g, --git', 'Start git management', false)
      .version(version)
      .description(description)
      .action(async (options: FuryOption) => {
        const command = this.getCommand(options)

        if (command) {
          await command.invoke()
        }
      })
  }

  /**
   * @name getCommand
   * @desc Get the command based on options.
   * @param {FuryOption} options - The options passed to the program.
   */
  private getCommand(options: FuryOption) {
    const objCommandParams = { prompt: this.prompt, logger: this.logger }

    switch (true) {
      case options.git: {
        return undefined
      }
      default: {
        return new InitProject(objCommandParams)
      }
    }
  }

  /**
   * @name run
   * @desc Parse the command line arguments and start the CLI application.
   * @example
   * app.run();
   */
  public run() {
    this.logger.debug('Program Start')
    this.program.parse(process.argv)
  }
}

// Start the application
new App().run()
