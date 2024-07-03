import { Logger } from '../utils'

export class Exception {
  protected logger: Logger

  public title: string
  public message: string

  constructor(title: string, message: string) {
    this.logger = Logger.getInstance()

    this.title = `${title}Exception`
    this.message = message
  }
}
