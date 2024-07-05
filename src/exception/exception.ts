import { Logger } from '../utils'

export class Exception {
  protected logger: Logger

  public title: string
  public message: string
  public context?: Error

  constructor(title: string, message: string, context?: Error) {
    this.logger = Logger.getInstance()

    this.title = `${title}Exception`
    this.message = message
    this.context = context
  }
}
