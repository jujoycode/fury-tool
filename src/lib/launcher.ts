export class Launcher {
  private static instance: Launcher
  private execa: typeof import('execa') | null = null

  protected constructor() {
    import('execa').then(module => {
      this.execa = module
    })
  }

  public static getInstance() {
    if (!Launcher.instance) {
      Launcher.instance = new Launcher()
    }

    return Launcher.instance
  }

  public async run(command: string, args: string[], path?: string) {
    if (!this.execa) {
      throw new Error('Launcher instance is not initialized yet.')
    }

    const { stdout } = await this.execa.execa(command, args, { cwd: path })
    return stdout
  }
}
