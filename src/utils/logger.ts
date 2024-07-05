import moment from 'moment'

import type { Exception } from '../exception'
import { LogLevel } from '../interfaces/project'

/**
 * @name Logger
 * @desc Logger class implementing the Singleton pattern.
 */
export class Logger {
  private static instance: Logger
  private logLevel: number

  private constructor(logLevel?: keyof LogLevel) {
    const level = {
      error: 0,
      info: 1,
      warn: 2,
      debug: 3,
      trace: 4
    }

    this.logLevel = logLevel ? level[logLevel] : 2
  }

  /**
   * @name getInstance
   * @desc Get the singleton instance of the Logger.
   * @returns {Logger} The Logger instance.
   */
  public static getInstance(logLevel?: keyof LogLevel): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(logLevel)
      this.instance.debug('New Logger Instance')
      this.instance.debug(`Level: ${logLevel}`)
    } else {
      this.instance.debug('Get Logger Instance')
    }

    return Logger.instance
  }

  /**
   * @name formatMessage
   * @desc Format the log message with timestamp, PID, and log level.
   * @param {string} level - The log level (LOG, INFO, WARN, ERROR).
   * @param {string} message - The log message.
   * @returns {string} The formatted log message.
   * @example
   * this.formatMessage('INFO', 'This is an info message.')
   */
  private formatMessage(color: string, level: string, message: string): string {
    const end = '\x1b[0m'
    const timestamp = moment().format('YYYY.MM.DD HH:mm:ss')
    return `${timestamp} | ${color}${level}${end} | ${message}`
  }

  /**
   * @name debug
   * @desc Log a debug message.
   * @param {string} message - The log message.
   * @example
   * logger.debug('This is a debug message.')
   */
  public debug(message: string | object): void {
    if (this.logLevel >= 3) {
      if (typeof message === 'object') {
        message = JSON.stringify(message, null, 2)
      }
      console.log(this.formatMessage('\x1b[36m', 'DEBUG', message))
    }
  }

  /**
   * @name info
   * @desc Log an info message.
   * @param {string} message - The log message.
   * @example
   * logger.info('This is an info message.')
   */
  public info(message: string): void {
    if (this.logLevel >= 1) {
      console.info(this.formatMessage('\x1b[32m', 'INFO', message))
    }
  }

  /**
   * @name warn
   * @desc Log a warning message.
   * @param {string} message - The log message.
   * @example
   * logger.warn('This is a warning message.')
   */
  public warn(message: string): void {
    if (this.logLevel >= 2) {
      console.warn(this.formatMessage('\x1b[33m', 'WARN', message))
    }
  }

  /**
   * @name error
   * @desc Log an error message.
   * @param {string} message - The log message
   * @example
   * logger.error('This is a error message.')
   */
  public error(message: string): void {
    if (this.logLevel >= 0) {
      console.error(this.formatMessage('\x1b[31m', 'ERROR', message))
    }
  }

  /**
   * @name errorD
   * @desc Log an error message.
   * @param {Exception} errorContext - The error context
   * @example
   * logger.errorD(exception)
   */
  public errorD(errorContext: Exception): void {
    if (this.logLevel >= 4) {
      console.error(
        this.formatMessage(
          '\x1b[31m',
          'ERROR_D',
          `{\n  type: '${errorContext.title}'\n  reason: '${errorContext.context}'\n}`
        )
      )
    }
  }

  /**
   * @name space
   * @desc Log an Empty Line
   * @example
   * logger.space()
   */
  public space(): void {
    console.log()
  }

  /**
   * @name logo
   * @desc Show Program Logo
   * @example
   * logger.logo()
   */
  public logo(): void {
    const asciiArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⡏⡀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡿⠃⠀⣀⣀⡀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣸⣿⣿⣿⣿⣿⣿⣿⣶⣾⣿⣿⣗⠀⠀⢀⣠⣶⣿⣿⡇⠀⠀⢀⣾⣾⣾⣾⣾⣾⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⡞⠁⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣾⣿⣿⣿⠿⠏⠁⠀⠀⢸⣿⣿⠉⠉⠉⠉⢠⣤⣤⠀⠀⣤⣤⡄⠀⣠⣤⣄⣠⣤⢠⣤⣤⠀⠀⣤⣤⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣾⠅⠨⣿⣿⢿⣿⣿⣿⣿⣿⣿⡏⠈⠘⣻⣿⠉⠈⠀⠀⠀⠀⠀⠀⣽⣿⣿⣾⣾⡎⠀⣼⣿⣟⠀⢐⣿⣿⠃⢀⣿⣿⠿⠛⠓⢘⣿⣿⠀⢰⣿⡟⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⣿⣧⣀⠙⠡⣿⣿⣿⡏⣿⣿⡿⠁⠀⢀⣽⣿⣧⣀⠀⠀⠀⠀⠀⢰⣿⣿⠁⠁⠁⠁⢀⣿⣿⡇⠀⣼⣿⣟⠀⢰⣿⣿⠁⠀⠀⠀⣿⣿⣠⣿⡟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣧⣍⣉⣁⣀⣤⣾⣿⡿⠿⠋⠀⠀⠀⠀⠀⣾⣿⡯⠀⠀⠀⠀⠘⣿⣿⡿⡿⢻⣿⣟⠀⣽⣿⡏⠀⠀⠀⠀⣻⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠟⠿⠿⠻⠟⠿⠻⠻⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣾⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`
    console.log(asciiArt)
  }
}
