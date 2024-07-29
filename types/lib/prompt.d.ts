import { Question } from '../interfaces/prompt';
export declare class Prompter {
    private Prompter;
    constructor();
    ask<T extends Question>(questions: T[]): Promise<Record<string, string | boolean>>;
}
