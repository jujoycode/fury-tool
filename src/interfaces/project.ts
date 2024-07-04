interface FuryOption {
  git: boolean
}

interface ProjectInfo {
  projectName: string
  useTypescript: boolean
  useFramework: boolean
  useGit: boolean
  usePrettier: boolean
  useEslint: boolean
  frameworkType: 'default' | 'react' | 'vue' | 'express'
  remoteUrl?: string
}

interface LogLevel {
  error: 0
  info: 1
  warn: 2
  debug: 3
  trace: 4
}

export { ProjectInfo, FuryOption, LogLevel }
