export class Spinner {
  private static instance: Spinner
  private ora: any

  protected constructor() {
    // 동적 import를 사용하여 ora 모듈을 가져옵니다.
    import('ora')
      .then(module => {
        this.ora = module.default()
      })
      .catch(err => {
        console.error(`Failed to load 'ora' module:`, err)
      })
  }

  /**
   * @name getInstance
   * @desc Get the singleton instance of the Spinner.
   * @returns {Spinner} The Spinner instance.
   */
  public static getInstance(): Spinner {
    if (!Spinner.instance) {
      Spinner.instance = new Spinner()
    }

    return Spinner.instance
  }

  public get() {
    return this.ora
  }
}
