import type { Question, SelectQuestion } from '../interfaces/prompt'

const SETTING_INIT_PROMPT: SelectQuestion[] = [
	{
		type: 'select',
		title: 'subCommand',
		message: 'Select what you want to set:',
		choices: [
			{ name: 'Log Level', value: 'logLevel' },
			{ name: 'DB Connection', value: 'dbConnection' }
		]
	}
]

const SETTING_LOGLEVEL_PROMPT: Question[] = [
	{
		type: 'select',
		title: 'logLevel',
		message: 'What level do you want to set it to?:',
		choices: [
			{
				name: '\x1b[31merror\x1b[0m',
				description: 'Only error logs are displayed.',
				value: 'error'
			},
			{
				name: '\x1b[32minfo\x1b[0m',
				description: 'Default, Errors and System information are displayed.',
				value: 'info'
			},
			{
				name: '\x1b[33mwarn\x1b[0m',
				description: 'Displays logs in including warning logs.',
				value: 'warn'
			},
			{
				name: '\x1b[36mdebug\x1b[0m',
				description: 'Displays logs in including additional information for debug.',
				value: 'debug'
			},
			{
				name: '\x1b[35mtrace\x1b[0m',
				description: 'Shows all logs, including Stact Trace',
				value: 'trace'
			}
		],
		default: 'info'
	}
]

export { SETTING_INIT_PROMPT, SETTING_LOGLEVEL_PROMPT }
