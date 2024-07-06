export class UpdateNotifier {
  constructor() { }

  static async call(pkg: { name: string; version: string }) {
    const { default: UpdateNotifier } = await import('update-notifier')
    const noti = UpdateNotifier({ pkg, updateCheckInterval: 0 })

    const message = `New Version! \x1b[31m{currentVersion}\x1b[0m → \x1b[32m{latestVersion}\x1b[0m.\n \x1b[35mChangelog:\x1b[0m https://github.com/jujoycode/fury-tool\n\n Run "{updateCommand}" to update.`

    if (noti.update) {
      noti.notify({ message })
    }
  }
}
