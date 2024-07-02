export class CommonUtil {
  constructor() {}

  static validateRequireFields(targetObject: { [key: string]: any }, requiredKeys: string[]) {
    requiredKeys.forEach(key => {
      const currentValue = targetObject[key]

      if (!currentValue) {
        throw new Error(`NotFoundException : ${key}`)
      }

      return true
    })
  }
}
