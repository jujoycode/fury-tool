import { ProjectInfo } from '../interfaces/project';
import { Logger, FileUtil } from '../utils';
/**
 * @name BaseFactory
 * @desc Abstract class representing a base factory for project creation.
 */
export declare abstract class Factory {
    protected logger: Logger;
    protected FileUtil: typeof FileUtil;
    protected projectInfo: ProjectInfo;
    protected sWorkDir: string;
    /**
     * @desc Constructor to initialize BaseFactory with project information.
     * @param {ProjectInfo} projectInfo - The project information.
     */
    constructor(projectInfo: ProjectInfo);
    /**
     * @name getWorkDir
     * @desc Abstract method to get project path.
     * @example
     * await factory.getWorkDir();
     */
    abstract getWorkDir(): string;
    /**
     * @name setup
     * @desc Abstract method to setup the project.
     * @example
     * await factory.setup();
     */
    abstract setup(): Promise<void>;
    /**
     * @name setWorkDir
     * @desc Set the path for cwd.
     * @example
     * const sPath = this.FileUtil.makePath(this.sWorkDir, 'newPath')
     * new BaseCommand.setWorkDir(sPath);
     */
    protected setWorkDir(sWorkDir: string): void;
}
