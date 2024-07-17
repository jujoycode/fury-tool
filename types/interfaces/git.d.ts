interface GitInfo {
    subCommand: 'init' | 'push' | 'pull' | 'merge' | 'branch';
    remoteUrl: string;
    useFirstCommit: boolean;
    commitType: string;
    commitMessage: string;
    pushPermission: boolean;
    targetBranch: string;
}
export { GitInfo };
