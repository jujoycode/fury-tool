export declare class Launcher {
  private static instance
  private execa
  protected constructor()
  static getInstance(): Launcher
  run(command: string, args: string[], path?: string): Promise<string>
}
