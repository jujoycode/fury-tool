import prompts, { PromptObject } from 'prompts'

export { PromptObject }

export class Prompt {
  private prompt: typeof prompts

  constructor() {
    this.prompt = prompts
  }

  public async call(PromptObject: PromptObject[]) {
    const result = await this.prompt(PromptObject)

    return result
  }
}
