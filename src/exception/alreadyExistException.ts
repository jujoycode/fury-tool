import { Exception } from './exception'

const title = 'AlreadyExist'

export class AlreadyExistException extends Exception {
  constructor(message: string) {
    super(title, '', message as any)
    this.logger.error(`${message} is already exist.`)
  }
}
