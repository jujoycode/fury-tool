import prompts, { PromptObject } from 'prompts'
import { Logger, CommonUtil } from '../utils'

export { PromptObject }

import { input, select } from '@inquirer/prompts'
import {
	InputQuestion,
	SelectQuestion,
	ConfirmQuestion,
	Question,
	QuestionResult
} from '../interfaces/prompt'

export class Prompt {
	private prompt: typeof prompts

	constructor() {
		this.prompt = prompts
	}

	public async call(PromptObject: PromptObject[]) {
		const result = await this.prompt(PromptObject, {
			onCancel: () => {
				//ENHANCE: custom exception으로 변경 후, Rollback 호출
				Logger.getInstance().error('User Cancel Exception')
			}
		})

		CommonUtil.validateRequireFields(
			result,
			PromptObject.map(prompt => String(prompt.name))
		)
		return result
	}
}

class Prompter {
	private Prompter: {
		input: typeof input
		select: typeof select
	}

	constructor() {
		this.Prompter = {
			input,
			select
		}
	}

	public async ask<T extends Question>(questions: T[]): Promise<Record<string, string | boolean>> {
		const returnObject: Record<string, string | boolean> = {}

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
			}

			Object.assign(returnObject, { [question.title]: answer })
		}

		CommonUtil.validateRequireFields(
			returnObject,
			questions.map(question => String(question.title))
		)

		console.log(returnObject)
		return returnObject
	}
}
