import { Factory } from './factory'

export class ExpressProjectFactory extends Factory {
  async setup() { }

  getWorkDir(): string {
    return ''
  }
}
