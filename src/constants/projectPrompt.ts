import { PromptObject } from '../lib'

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
    initial: true
  },
  {
    type: 'confirm',
    name: 'useFramework',
    message: 'Use Framework?',
    initial: true
  },
  {
    type: 'confirm',
    name: 'usePrettier',
    message: 'Use Prettier?',
    initial: true
  },
  {
    type: 'confirm',
    name: 'useEslint',
    message: 'Use ESLint?',
    initial: true
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

export { PROJECT_INIT_PROMPT, USE_FRAMEWORK }
