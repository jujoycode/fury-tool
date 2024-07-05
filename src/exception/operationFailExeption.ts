import { Exception } from './exception'

const title = 'OperationFail'

export class OperationFailException extends Exception {
  constructor(message: string, context?: Error) {
    super(title, message, context)

    this.logger.error(`${this.convertMessage(message as any)} Faild.`)
  }

  private convertMessage(message: 'projectBuild' | 'createDirectory') {
    const convertTemplate = {
      projectBuild: 'Project Build',
      createDirectory: 'Create Project Directory'
    }

    return convertTemplate[message]
  }
}
