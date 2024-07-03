import { OperationFailException } from '../exception'

export class CommonUtil {
  constructor() {}

  static validateRequireFields(targetObject: { [key: string]: any }, requiredKeys: string[]) {
    requiredKeys.forEach(key => {
      const currentValue = targetObject[key]

      if (!currentValue) {
        throw new OperationFailException(key)
      }

      return true
    })
  }
}
