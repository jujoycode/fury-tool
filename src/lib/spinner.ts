import { NoDataException } from '../exception'

import type { Ora } from '../interfaces/spinner'

export class Spinner {
  private static instance: Spinner
  private ora: Ora | null = null

  protected constructor() {
    import('ora')
      .then(module => {
        this.ora = module.default({ spinner: 'arc' })
      })
      .catch(error => {
        throw new NoDataException(error.message)
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

  private get() {
    if (!this.ora) {
      throw new NoDataException('Spinner instance is not initialized yet.')
    }

    return this.ora
  }

  public start(text: string) {
    return this.get().start(text)
  }

  public success(spinner: Ora, text?: string) {
    spinner.stopAndPersist({ symbol: '\x1b[32m√\x1b[0m', text: text })
  }
}
