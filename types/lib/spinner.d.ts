import type { Ora } from '../interfaces/spinner'
export declare class Spinner {
  private static instance
  private ora
  protected constructor()
  /**
   * @name getInstance
   * @desc Get the singleton instance of the Spinner.
   * @returns {Spinner} The Spinner instance.
   */
  static getInstance(): Spinner
  get(): Ora
}
