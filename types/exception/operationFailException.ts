import { Exception } from './exception'
export declare class OperationFailException extends Exception {
  constructor(message: string, context?: Error)
  private convertMessage
}
