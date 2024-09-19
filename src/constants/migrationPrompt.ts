import type { Question, SelectQuestion } from '../interfaces/prompt'

const MIG_INIT_PROMPT: SelectQuestion[] = [
	{
		type: 'select',
		title: 'targetDB',
		message: 'Select the target DB you want:',
		choices: []
	}
]

export { MIG_INIT_PROMPT }
