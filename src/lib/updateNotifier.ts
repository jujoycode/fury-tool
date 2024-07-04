export class UpdateNotifier {
  constructor() {}

  static async call(pkg: { name: string; version: string }) {
    const { default: UpdateNotifier } = await import('update-notifier')

    const message = 'Run `{updateCommand}` to update.'
    UpdateNotifier({ pkg, updateCheckInterval: 0 }).notify()
  }
}
