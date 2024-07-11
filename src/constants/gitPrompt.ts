import type { PromptObject } from '../lib'

const GIT_INIT_PROMPT: PromptObject[] = [
  {
    type: 'select',
    name: 'subCommand',
    message: 'Select the action you want: ',
    choices: [
      { title: 'Init', value: 'init' },
      { title: 'Commit & Push', value: 'push' },
      { title: 'Pull', value: 'pull', disabled: true },
      { title: 'Merge', value: 'merge', disabled: true }
    ]
  }
]

const CONFIRM_ADDITION_SETTING: PromptObject[] = [
  {
    type: 'text',
    name: 'remoteUrl',
    message: 'Enter the remote repo URL:',
    validate: prev => {
      const regExp = new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/)

      if (prev === '') {
        return false
      }

      if (regExp.test(prev)) {
        return true
      } else {
        return false
      }
    }
  },
  {
    type: 'confirm',
    name: 'useFirstCommit',
    message: 'Do you want to initial commit?',
    initial: true
  }
]

export { GIT_INIT_PROMPT, CONFIRM_ADDITION_SETTING }
