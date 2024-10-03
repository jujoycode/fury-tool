import { Exception } from './exception'
import { ProjectInfo } from '../interfaces/project'

const title = 'NoData'

export class NoDataException extends Exception {
  constructor(message: string) {
    super(title, message, new Error(`${message} is undefined`))
    this.logger.error(`${this.convertMessage(message as any)} is not exist.`)
  }

  private convertMessage(message: keyof ProjectInfo) {
    const convertTemplate = {
      projectName: '[Project Name] value',
      packageManager: '[Package Manager] value',
      useTypescript: '[Use Typescript] value',
      useFramework: '[Use Framework] value',
      useGit: '[Use Git] value',
      usePrettier: '[Use Prettier] value',
      useEslint: '[Use Eslint] value',
      frameworkType: '[Framework Type] value',
      remoteUrl: '[Remote URL] value',
      defaultBranch: '[Default Branch] value'
    }

    return convertTemplate[message]
  }
}
