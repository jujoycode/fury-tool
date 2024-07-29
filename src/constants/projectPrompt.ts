import type { Question } from '../interfaces/prompt'

const PROJECT_INIT_PROMPT: Question[] = [
	{
		type: 'input',
		title: 'projectName',
		message: 'Enter the project name: ',
		default: 'demo',
		required: true
	},
	{
		type: 'select',
		title: 'packageManager',
		message: 'Select a package manager:',
		choices: [
			{ name: '\x1b[31mnpm\x1b[0m', value: 'npm' },
			{ name: '\x1b[36myarn\x1b[0m', value: 'yarn' },
			{ name: '\x1b[33mpnpm\x1b[0m', value: 'pnpm' }
		],
		loop: true
	},
	{
		type: 'confirm',
		title: 'useTypescript',
		message: 'Use TypeScript?',
		default: false
	},
	{
		type: 'confirm',
		title: 'useFramework',
		message: 'Use Framework?',
		default: false
	},
	{
		type: 'confirm',
		title: 'useGit',
		message: 'Use Git?',
		default: false
	},
	{
		type: 'confirm',
		title: 'usePrettier',
		message: 'Use Prettier?',
		default: false
	}
]

const USE_FRAMEWORK: Question[] = [
	{
		type: 'select',
		title: 'frameworkType',
		message: 'Select a framework:',
		choices: [
			{ name: '\x1b[34mReact\x1b[0m', value: 'react' },
			{ name: '\x1b[32mVue\x1b[0m', value: 'vue' }
		]
	}
]

const USE_GIT: Question[] = [
	{
		type: 'input',
		title: 'remoteUrl',
		message: 'Enter the remote repo URL: ',
		required: true,
		validate: prev => {
			const regExp = new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/)

			if (regExp.test(prev)) {
				return true
			} else {
				return false
			}
		}
	}
]

export { PROJECT_INIT_PROMPT, USE_FRAMEWORK, USE_GIT }
