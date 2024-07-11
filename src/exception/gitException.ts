import { Exception } from './exception'

const title = 'Git'

export class GitException extends Exception {
  constructor(message: string) {
    super(title, message, message as any)
    this.logger.error(`${this.convertMessage(message as any)}.`)
  }

  private convertMessage(message: 'init') {
    const convertTemplate = {
      init: 'Not a git repository (.git)'
    }

    return convertTemplate[message]
  }
}
