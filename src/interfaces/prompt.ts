interface BaseQuestion {
	type: 'input' | 'select' | 'confirm'
	title: string
	message: string
}

interface InputQuestion extends BaseQuestion {
	type: 'input'
	default?: string
	required?: boolean
	validate?: (prev: string) => boolean | string | Promise<boolean | string>
}

interface SelectQuestion extends BaseQuestion {
	type: 'select'
	choices: {
		name: string
		value: string
		description?: string
	}[]
	loop?: boolean
}

interface ConfirmQuestion extends BaseQuestion {
	type: 'confirm'
	default: boolean
}

type Question = InputQuestion | SelectQuestion | ConfirmQuestion

type QuestionResult<T extends Question> = T extends InputQuestion
	? string
	: T extends SelectQuestion
	? string
	: T extends ConfirmQuestion
	? boolean
	: never

export { InputQuestion, SelectQuestion, ConfirmQuestion, Question, QuestionResult }
