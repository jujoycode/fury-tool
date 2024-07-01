import { BaseCommand } from './'
import { PROJECT_INIT, USE_FRAMEWORK } from '../constants'

import { ProjectInfo } from '../interfaces/project'

export class InitProject extends BaseCommand {
  private projectInfo = {} as ProjectInfo

  async prepare(): Promise<void> {
    this.logger.space()

    const a: any = {}

    a.ddd.vsaue = ''
    await this.prompt.call(PROJECT_INIT).then(res => {
      Object.assign(this.projectInfo, res)
    })

    if (this.projectInfo.useFramework) {
      await this.prompt.call(USE_FRAMEWORK).then(res => {
        Object.assign(this.projectInfo, res)
      })
    }

    this.logger.space()
    this.logger.debug(`projectInfo : ${JSON.stringify(this.projectInfo, null, 2)}`)
  }

  async execute(): Promise<void> {}
  async finalize(): Promise<void> {}

  async rollback(): Promise<void> {}
}
