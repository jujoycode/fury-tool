import type { Question, SelectQuestion } from '../interfaces/prompt'

const GIT_INIT_PROMPT: Question[] = [
	{
		type: 'select',
		title: 'subCommand',
		message: 'Select the action you want:',
		choices: [
			{ name: 'Init', value: 'init' },
			{ name: 'Commit & Push', value: 'push' },
			{ name: 'Pull', value: 'pull' },
			{ name: 'Merge', value: 'merge' },
			{ name: 'Branch Manage', value: 'branch' }
		]
	}
]

const INIT_SETTING: Question[] = [
	{
		type: 'input',
		title: 'remoteUrl',
		message: 'Enter the remote repo URL:',
		required: true,
		validate: prev => {
			const regExp = new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/)

			if (regExp.test(prev)) {
				return true
			} else {
				return false
			}
		}
	},
	{
		type: 'confirm',
		title: 'useFirstCommit',
		message: 'Do you want to initial commit?',
		default: true
	}
]

const COMMIT_INFO: Question[] = [
	{
		type: 'select',
		title: 'commitType',
		message: 'Select a type of commit: ',
		choices: [
			{ name: '🚧 - Work in Progress', value: ':construction:' },
			{ name: '✨ - New Feature', value: ':sparkles:' },
			{ name: '🐛 - Bug Fix', value: ':bug:' },
			{ name: '🔨 - Refactor Code', value: ':hammer:' },
			{ name: '⚡️ - Performance', value: ':zap:' },
			{ name: '💄 - Style', value: ':lipstick:' },
			{ name: '➕ - New Dependency', value: ':heavy_plus_sign:' },
			{ name: '📝 - Documentation', value: ':memo:' },
			{ name: '✅ - Tests', value: ':white_check_mark:' },
			{ name: '🏗️  - Build', value: ':building_construction:' },
			{ name: '🚀 - Deploying', value: ':rocket:' },
			{ name: '👷 - CI/CD', value: ':construction_worker:' },
			{ name: '🐌 - Chore', value: '🐌' }
		],
		loop: false
	},
	{
		type: 'input',
		title: 'commitMessage',
		message: 'Enter commit message: ',
		required: true,
		validate: (param: string) => {
			if (param !== '') {
				return true
			} else {
				return false
			}
		}
	},
	{
		type: 'confirm',
		title: 'pushPermission',
		message: 'Do you want to push to remote repo?: ',
		default: true
	}
]

const BRANCH_LIST: SelectQuestion[] = [
	{
		type: 'select',
		title: 'targetBranch',
		message: 'Select the target branch: ',
		choices: []
	}
]

const MERGE_INFO: Question[] = [
	{
		type: 'confirm',
		title: 'mergeComplete',
		message: 'Merge Done?: ',
		default: false
	}
]

const BRANCH_COMMAND: Question[] = [
	{
		type: 'select',
		title: 'branchCommand',
		message: 'Select the branch action you want: ',
		choices: [
			{ name: 'Switch Other', value: 'switch' },
			{ name: 'Create New', value: 'create' },
			{ name: 'Rename', value: 'rename' },
			{ name: 'Delete', value: 'delete' }
		]
	}
]

const BRANCH_INFO: Question[] = [
	{
		type: 'input',
		title: 'targetName',
		message: 'Enter the branch name you want: ',
		required: true
	}
]

export {
	GIT_INIT_PROMPT,
	INIT_SETTING,
	COMMIT_INFO,
	BRANCH_LIST,
	MERGE_INFO,
	BRANCH_COMMAND,
	BRANCH_INFO
}
