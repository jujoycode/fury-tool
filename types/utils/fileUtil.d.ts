export declare class FileUtil {
    static makePath(sRootPath: string, sTargetPath: string): string;
    static checkExist(sTargetPath: string): Promise<boolean>;
    static createDirectory(sWorkDir: string, sDirName: string, option?: {
        recursive: boolean;
    }): Promise<string>;
    static createFile(sWorkDir: string, sFileName: string, fileData: string | Buffer): Promise<boolean>;
    static createStructure(folderStructure: Record<string, any>, sPath: string): Promise<void>;
    static remove(sTargetpath: string, option?: {
        maxRetries?: number;
        recursive?: boolean;
    }): Promise<void>;
}
