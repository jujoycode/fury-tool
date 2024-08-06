import { Separator } from '@inquirer/prompts';
import { Question } from '../interfaces/prompt';
export declare class Prompter {
    private Prompter;
    constructor();
    getSeparator(): Separator;
    ask<T extends Question>(questions: T[]): Promise<Record<string, string | boolean>>;
}
