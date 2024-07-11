import { Command } from './';
export declare class GitManage extends Command {
    private gitInfo;
    private sWorkDir;
    prepare(): Promise<void>;
    execute(): Promise<void>;
    finalize(): Promise<void>;
    rollback(): Promise<void>;
    /**
     * @name checkGitFile
     * @desc .git 파일 유무 확인 후 존재하지 않을 시 에러 처리
     * @example await this.checkGitFile()
     */
    private checkGitFile;
}
