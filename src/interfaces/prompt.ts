interface BaseQuestion {
	type: 'input' | 'select' | 'confirm'
	title: string
	message: string
}

interface InputQuestion extends BaseQuestion {
	type: 'input'
}

interface SelectQuestion extends BaseQuestion {
	type: 'select'
	choices: {
		name: string
		value: string
		description?: string
	}[]
}

interface ConfirmQuestion extends BaseQuestion {
	type: 'confirm'
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
