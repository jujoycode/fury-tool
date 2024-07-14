import type { Exception } from '../exception'
import { LogLevel } from '../interfaces/project'
/**
 * @name Logger
 * @desc Logger class implementing the Singleton pattern.
 */
export declare class Logger {
  private static instance
  private logLevel
  private constructor()
  /**
   * @name getInstance
   * @desc Get the singleton instance of the Logger.
   * @returns {Logger} The Logger instance.
   */
  static getInstance(logLevel?: keyof LogLevel): Logger
  /**
   * @name formatMessage
   * @desc Format the log message with timestamp, PID, and log level.
   * @param {string} level - The log level (LOG, INFO, WARN, ERROR).
   * @param {string} message - The log message.
   * @returns {string} The formatted log message.
   * @example
   * this.formatMessage('INFO', 'This is an info message.')
   */
  private formatMessage
  /**
   * @name debug
   * @desc Log a debug message.
   * @param {string} message - The log message.
   * @example
   * logger.debug('This is a debug message.')
   */
  debug(message: string | object): void
  /**
   * @name info
   * @desc Log an info message.
   * @param {string} message - The log message.
   * @example
   * logger.info('This is an info message.')
   */
  info(message: string): void
  /**
   * @name warn
   * @desc Log a warning message.
   * @param {string} message - The log message.
   * @example
   * logger.warn('This is a warning message.')
   */
  warn(message: string): void
  /**
   * @name error
   * @desc Log an error message.
   * @param {string} message - The log message
   * @example
   * logger.error('This is a error message.')
   */
  error(message: string): void
  /**
   * @name errorD
   * @desc Log an error message.
   * @param {Exception} errorContext - The error context
   * @example
   * logger.errorD(exception)
   */
  errorD(errorContext: Exception): void
  /**
   * @name system
   * @desc Log an system message.
   * @param {string} message - The log message.
   * @example
   * logger.system(exception)
   */
  system(message: string): void
  /**
   * @name space
   * @desc Log an Empty Line
   * @example
   * logger.space()
   */
  space(): void
  /**
   * @name logo
   * @desc Show Program Logo
   * @example
   * logger.logo()
   */
  logo(): void
}
