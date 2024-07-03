import { Exception } from './exception'

const title = 'OperationFail'

export class OperationFailException extends Exception {
  constructor(message: string) {
    super(title, message)

    this.logger.error(`${message} 실패했습니다.`)
  }

  private convertMessage() {}
}
