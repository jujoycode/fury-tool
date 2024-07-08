#!/usr/bin/env node

import { Command as Commander } from 'commander'

import { InitProject } from './commands'
import { Prompt, UpdateNotifier, Spinner } from './lib'
import { Logger, CommonUtil, FileUtil } from './utils'

import { FuryOption, LogLevel } from './interfaces/project'

import { logLevel } from '../setting.json'
import pkg from '../package.json'

/**
 * @name App
 * @desc Main application class for the CLI tool.
 */
class App {
  private program: Commander
  private prompt: Prompt
  private spinner: Spinner
  private logger: Logger

  /**
   * @desc Constructor to initialize the App with the prompt library.
   */
  constructor() {
    this.program = new Commander()
    this.prompt = new Prompt()
    UpdateNotifier.call(pkg)

    this.spinner = Spinner.getInstance()
    this.logger = Logger.getInstance(logLevel as keyof LogLevel)

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
      .name(pkg.name)
      .option('no option', 'Start create project')
      .option('-g, --git', 'Start git management', false)
      .version(pkg.version)
      .description(pkg.description)
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
    const objCommandParams = {
      prompt: this.prompt,
      logger: this.logger,
      spinner: this.spinner,
      utils: { CommonUtil, FileUtil }
    }

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
    this.logger.logo()
    this.program.parse(process.argv)
  }
}

// Start the application
new App().run()
