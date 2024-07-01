import { ProjectInfo } from "../interfaces/project";
import { Logger } from "../utils";

export abstract class BaseFactory {
  protected logger: Logger
  protected projectInfo: ProjectInfo

  constructor(projectInfo: ProjectInfo) {
    this.logger = Logger.getInstance()
    this.projectInfo = projectInfo
  }

  abstract build(): Promise<void>
}