interface FuryOption {
  git: boolean
}

interface ProjectInfo {
  projectName: string
  useTypescript: boolean
  useFramework: boolean
  usePrettier: boolean
  useEslint: boolean
  frameworkType: 'default' | 'react' | 'vue' | 'express'
}

export { ProjectInfo, FuryOption }
