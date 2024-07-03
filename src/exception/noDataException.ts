import { Exception } from './exception'

const title = 'NoData'

export class NoDataException extends Exception {
  constructor(message: string) {
    super(title, message)
  }
}
