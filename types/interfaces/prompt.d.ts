interface BaseQuestion {
    type: 'input' | 'select' | 'confirm';
    title: string;
    message: string;
}
interface InputQuestion extends BaseQuestion {
    type: 'input';
    default?: string;
    required?: boolean;
    validate?: (prev: string) => boolean | string | Promise<boolean | string>;
}
type Choice<T> = {
    name: T;
    value: T;
    description?: string;
};
declare class Separator {
    readonly separator: string;
    readonly type = "separator";
    constructor(separator?: string);
    static isSeparator(choice: undefined | Separator | Record<string, unknown>): choice is Separator;
}
interface SelectQuestion extends BaseQuestion {
    type: 'select';
    choices: (Separator | Choice<string>)[];
    loop?: boolean;
    default?: string;
}
interface ConfirmQuestion extends BaseQuestion {
    type: 'confirm';
    default: boolean;
}
type Question = InputQuestion | SelectQuestion | ConfirmQuestion;
type QuestionResult<T extends Question> = T extends InputQuestion ? string : T extends SelectQuestion ? string : T extends ConfirmQuestion ? boolean : never;
export { InputQuestion, SelectQuestion, ConfirmQuestion, Question, QuestionResult };
