interface FuryOption {
    git: boolean;
    migration: boolean;
    setting: boolean;
}
interface ProjectInfo {
    projectName: string;
    packageManager: 'npm' | 'yarn' | 'pnpm';
    useTypescript: boolean;
    useFramework: boolean;
    useGit: boolean;
    usePrettier: boolean;
    useEslint: boolean;
    frameworkType: 'default' | 'react' | 'vue' | 'express';
    remoteUrl?: string;
}
interface LogLevel {
    error: 0;
    info: 1;
    warn: 2;
    debug: 3;
    trace: 4;
}
export { ProjectInfo, FuryOption, LogLevel };
