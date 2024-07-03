import moment from 'moment'
import type { Exception } from '../exception'

/**
 * @name Logger
 * @desc Logger class implementing the Singleton pattern.
 */
export class Logger {
  private static instance: Logger

  private constructor() {}

  /**
   * @name getInstance
   * @desc Get the singleton instance of the Logger.
   * @returns {Logger} The Logger instance.
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
      this.instance.debug('New Logger Instance')
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
    const pid = process.pid
    return `${timestamp} | ${color}${level}${end} | ${message}`
  }

  /**
   * @name debug
   * @desc Log a debug message.
   * @param {string} message - The log message.
   * @example
   * logger.log('This is a debug message.')
   */
  public debug(message: string | object): void {
    if (typeof message === 'object') {
      message = JSON.stringify(message, null, 2)
    }
    console.log(this.formatMessage('\x1b[36m', 'DEBUG', message))
  }

  /**
   * @name info
   * @desc Log an info message.
   * @param {string} message - The log message.
   * @example
   * logger.info('This is an info message.')
   */
  public info(message: string): void {
    console.info(this.formatMessage('\x1b[32m', 'INFO', message))
  }

  /**
   * @name warn
   * @desc Log a warning message.
   * @param {string} message - The log message.
   * @example
   * logger.warn('This is a warning message.')
   */
  public warn(message: string): void {
    console.warn(this.formatMessage('\x1b[33m', 'WARN', message))
  }

  /**
   * @name error
   * @desc Log an error message.
   * @param {string} message - The log message
   * @example
   * logger.error('This is a error message.')
   */
  public error(message: string): void {
    console.error(this.formatMessage('\x1b[31m', 'ERROR', message))
  }

  /**
   * @name errorD
   * @desc Log an error message.
   * @param {Exception} errorContext - The error context
   * @example
   * logger.errorD(exception)
   */
  public errorD(errorContext: Exception): void {
    console.error(
      this.formatMessage(
        '\x1b[31m',
        'ERROR DEBUG',
        `{\n  type: '${errorContext.title}'\n  reason: '${errorContext.message}'\n}`
      )
    )
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
}
