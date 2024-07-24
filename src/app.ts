#!/usr/bin/env node

import { Command as Commander } from 'commander'

import { InitProject, GitManage, Setting, Migration } from './commands'
import { Prompt, UpdateNotifier, Spinner, Launcher } from './lib'
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
  private launcher: Launcher
  private logger: Logger

  /**
   * @desc Constructor to initialize the App with the prompt library.
   */
  constructor() {
    this.program = new Commander()
    this.prompt = new Prompt()
    // UpdateNotifier.call(pkg) //TODO: 빌드 시 주석 해제

    this.spinner = Spinner.getInstance()
    this.launcher = Launcher.getInstance()
    this.logger = Logger.getInstance(logLevel as keyof LogLevel)

    this.configureCommands()
  }

  /**
   * @name configureCommands
   * @desc Configure the commands for the CLI application.
   * @example
   * this.configureCommands();
   */
  private configureCommands() {
    this.program
      .name('fury')
      .option('no option', 'Start create project')
      .option('-g, --git', 'Management git')
      .option('-m, --migration', 'Migration data')
      .option('-setting, --setting', 'Edit fury setting')
      .helpOption('-h, --help', 'Read more information')
      .version(pkg.version, '-v, --version', 'Output the version number')
      .showHelpAfterError('(add --help for additional information)')
      .description(pkg.description)
      .action(async (options: FuryOption) => {
        const command = this.getCommand(options)

        if (command) {
          console.time('🔥')

          await command.invoke()

          this.logger.space()
          console.timeEnd('🔥')
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
      launcher: this.launcher,
      utils: { CommonUtil, FileUtil }
    }

    this.logger.logo()

    switch (true) {
      case options.git: {
        //READ: git 관련 작업 수행 (push, pull, merge, manage branch)
        return new GitManage(objCommandParams)
      }
      case options.migration: {
        //READ: DB 병합 관련 기능 수행 (table)
        return new Migration(objCommandParams)
      }
      case options.setting: {
        //READ: fury 옵션 설정 기능 (logLevel, DB Connection ...)
        return new Setting(objCommandParams)
      }
      default: {
        //READ: Project 생성 기능
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
    this.program.parse(process.argv)
  }
}

// Start the application
new App().run()
