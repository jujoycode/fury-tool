interface GitInfo {
    subCommand: 'init' | 'push' | 'pull' | 'merge';
    remoteUrl: string;
    useFirstCommit: boolean;
}
export { GitInfo };
