import { Factory } from './factory'

export class VueProjectFactory extends Factory {
  /**
   * @name setup
   * @desc setup the project with vue3.
   * @example
   * await factory.setup();
   */
  async setup() {}

  getWorkDir(): string {
    return ''
  }
}
