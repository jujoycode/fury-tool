import type { PromptObject } from '../lib'

const PROJECT_INIT_PROMPT: PromptObject[] = [
  {
    type: 'text',
    name: 'projectName',
    message: 'Enter the project name:',
    initial: 'demo'
  },
  {
    type: 'confirm',
    name: 'useTypescript',
    message: 'Use TypeScript?',
    initial: false
  },
  {
    type: 'confirm',
    name: 'useFramework',
    message: 'Use Framework?',
    initial: false
  },
  {
    type: 'confirm',
    name: 'useGit',
    message: 'Use Git?',
    initial: false
  },
  {
    type: 'confirm',
    name: 'usePrettier',
    message: 'Use Prettier?',
    initial: false
  },
  {
    type: 'confirm',
    name: 'useEslint',
    message: 'Use ESLint?',
    initial: false
  }
]

const USE_FRAMEWORK: PromptObject[] = [
  {
    type: 'select',
    name: 'frameworkType',
    message: 'Select a framework:',
    choices: [
      { title: '\x1b[34mReact\x1b[0m', value: 'react' },
      { title: '\x1b[32mVue\x1b[0m', value: 'vue' }
    ]
  }
]

const USE_GIT: PromptObject[] = [
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
  }
]

export { PROJECT_INIT_PROMPT, USE_FRAMEWORK, USE_GIT }
