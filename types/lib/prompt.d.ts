import prompts, { PromptObject } from 'prompts';
export { PromptObject };
export declare class Prompt {
    private prompt;
    constructor();
    call(PromptObject: PromptObject[]): Promise<prompts.Answers<string>>;
}
