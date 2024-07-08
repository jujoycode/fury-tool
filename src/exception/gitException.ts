import { Exception } from './exception'

const title = 'Git'

export class GitException extends Exception {
  constructor(message: string) {
    super(title, message)
  }
}
