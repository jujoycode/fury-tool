import prompts, { PromptObject } from 'prompts'
import { CommonUtil } from '../utils'

export { PromptObject }

export class Prompt {
  private prompt: typeof prompts

  constructor() {
    this.prompt = prompts
  }

  public async call(PromptObject: PromptObject[]) {
    const result = await this.prompt(PromptObject, {
      onCancel: () => {
        //ENHANCE: custom exception으로 변경 후, Rollback 호출
        console.error('User Cancel Exception')
      }
    })

    CommonUtil.validateRequireFields(result, PromptObject.map(prompt => String(prompt.name)))
    return result
  }
}
