import { PromptObject } from '../lib'

const PROJECT_INIT: PromptObject[] = [
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
    name: 'framework',
    message: 'Select a framework:',
    choices: [
      { title: 'React', value: 'react' },
      { title: 'Vue', value: 'vue' }
    ]
  }
]

export { PROJECT_INIT, USE_FRAMEWORK }
