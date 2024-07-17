import type { PromptObject } from '../lib'

const GIT_INIT_PROMPT: PromptObject[] = [
  {
    type: 'select',
    name: 'subCommand',
    message: 'Select the action you want: ',
    choices: [
      { title: 'Init', value: 'init' },
      { title: 'Commit & Push', value: 'push' },
      { title: 'Pull', value: 'pull' },
      { title: 'Merge', value: 'merge', disabled: true },
      { title: 'Branch Manage', value: 'branch', disabled: true }
    ]
  }
]

const INIT_SETTING: PromptObject[] = [
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

const COMMIT_INFO: PromptObject[] = [
  {
    type: 'select',
    name: 'commitType',
    message: 'Select a type of commit: ',
    choices: [
      { title: '🚧 - Work in Progress', value: ':construction:' },
      { title: '✨ - New Feature', value: ':sparkles:' },
      { title: '🐛 - Bug Fix', value: ':bug:' },
      { title: '🔨 - Refactor Code', value: ':hammer:' },
      { title: '⚡️ - Performance', value: ':zap:' },
      { title: '💄 - Style', value: ':lipstick:' },
      { title: '➕ - New Dependency', value: ':heavy_plus_sign:' },
      { title: '📝 - Documentation', value: ':memo:' },
      { title: '✅ - Tests', value: ':white_check_mark:' },
      { title: '🏗️  - Build', value: ':building_construction:' },
      { title: '🚀 - Deploying', value: ':rocket:' },
      { title: '👷 - CI/CD', value: ':construction_worker:' },
      { title: '🐌 - Chore', value: '🐌' }
    ]
  },
  {
    type: 'text',
    name: 'commitMessage',
    message: 'Enter commit message: ',
    validate: (param: string) => {
      if (param !== '') {
        return true
      } else {
        return false
      }
    }
  },
  {
    type: 'toggle',
    name: 'pushPermission',
    active: 'yes',
    inactive: 'no',
    initial: true,
    message: 'Do you want to push to remote repo?: '
  }
]

export { GIT_INIT_PROMPT, INIT_SETTING, COMMIT_INFO }
