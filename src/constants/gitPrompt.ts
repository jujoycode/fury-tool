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

export { GIT_INIT_PROMPT }
