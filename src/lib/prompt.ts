import { input, select, confirm, Separator } from '@inquirer/prompts'
import { CommonUtil } from '../utils'

import { Question } from '../interfaces/prompt'

export class Prompter {
	private Prompter: {
		input: typeof input
		select: typeof select
		confirm: typeof confirm
	}

	constructor() {
		this.Prompter = {
			input,
			select,
			confirm
		}
	}

	public getSeparator() {
		return new Separator()
	}

	public async ask<T extends Question>(questions: T[]): Promise<Record<string, string | boolean>> {
		const returnObject: Record<string, string | boolean> = {}

		// ENHANCE: User Exception Error 발생 시 예외 처리 필요...
		for (let i = 0; i < questions.length; i++) {
			const question = questions[i]
			let answer = undefined

			switch (question.type) {
				case 'input': {
					answer = await this.Prompter.input({ ...question })
					break
				}

				case 'select': {
					answer = await this.Prompter.select({ ...question })
					break
				}

				case 'confirm': {
					answer = await this.Prompter.confirm({ ...question })
					break
				}
			}

			Object.assign(returnObject, { [question.title]: answer })
		}

		CommonUtil.validateRequireFields(
			returnObject,
			questions.map(question => String(question.title))
		)

		return returnObject
	}
}
