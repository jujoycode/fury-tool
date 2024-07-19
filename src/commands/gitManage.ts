import { Command } from './'
import { GIT_INIT_PROMPT, INIT_SETTING, COMMIT_INFO, BRANCH_LIST, MERGE_INFO, BRANCH_COMMAND, BRANCH_INFO } from '../constants'
import { GitException, AlreadyExistException, NoDataException } from '../exception'

import { GitInfo } from '../interfaces/git'

export class GitManage extends Command {
  private gitInfo: GitInfo = {} as GitInfo
  private sWorkDir: string = process.cwd()

  /**
   * @name prepare
   * @desc Prepares the project by collecting user inputs.
   * This method is responsible for gathering necessary inputs from the user
   * before executing any Git commands.
   * @example
   * await command.prepare();
   */
  async prepare(): Promise<void> {
    // 0. Child Command 선택
    Object.assign(this.gitInfo, await this.Prompt.call(GIT_INIT_PROMPT))
  }

  /**
   * @name execute
   * @desc Executes the appropriate Git command based on the user input.
   * This method determines which Git command to execute (init, push, pull, merge, branch)
   * based on the user input collected during the prepare phase.
   * @example
   * await command.execute();
   */
  async execute(): Promise<void> {
    switch (this.gitInfo.subCommand) {
      case 'init': {
        await this.checkValidation()
        await this.initGit()

        break
      }

      case 'push': {
        await this.checkValidation('hard')
        await this.pushGit()

        break
      }

      case 'pull': {
        await this.checkValidation('hard')
        await this.pullGit()

        break
      }

      case 'merge': {
        await this.checkValidation('hard')
        await this.mergeGit()

        break
      }

      case 'branch': {
        await this.checkValidation('hard')
        await this.branchManage()

        break
      }
    }
  }

  /**
   * @name finalize
   * @desc Finalizes the project creation process.
   * This method is reserved for any cleanup or final steps that need to be
   * executed after the main Git commands have been run.
   * @example
   * await command.finalize();
   */
  async finalize(): Promise<void> {
    // command에 맞는 로깅 수행
    switch (this.gitInfo.subCommand) {
      case 'branch':
        switch (this.gitInfo.branchCommand) {
          case 'switch': {
            this.Logger.info(`Now in \x1b[35m${this.gitInfo.targetBranch}\x1b[0m branch, check it out!`)
            break
          }

          case 'create': {
            this.Logger.info(`Now in \x1b[35m${this.gitInfo.targetName}\x1b[0m branch, check it out!`)
            break
          }
        }
        break;
    }
  }

  /**
   * @name rollback
   * @desc Rolls back the project creation in case of failure.
   * This method is responsible for undoing any changes made during the execution
   * of the Git commands if an error occurs.
   * @example
   * await command.rollback();
   */
  async rollback(): Promise<void> {
    // 99. 에러가 발생한 지점 파악
    // 99-1. Roollback 사전 준비
    // 99-2. Rollback 수행
  }

  /**
   * @name checkValidation
   * @desc Checks for the existence of the .git directory and validates the Git setup.
   * This method verifies if Git is installed and, if a 'hard' check is requested,
   * ensures that the current directory is a Git repository.
   * @param {string} [type] - The type of validation to perform ('hard' for full validation).
   * @example
   * await this.checkValidation();
   * await this.checkValidation('hard');
   */
  private async checkValidation(type?: 'hard') {
    // 0. git 설치 여부 검증
    try {
      await this.Launcher.run('git', ['-v'])
    } catch (error) {
      throw new GitException('notInstall')
    }

    if (type === 'hard') {
      // 1. .git 파일 존재 검증
      const sPath = this.FileUtil.makePath(this.sWorkDir, '.git')
      const bGitFileExists = await this.FileUtil.checkExist(sPath)

      if (!bGitFileExists) {
        throw new GitException('init')
      }
    }
  }

  /**
   * @name initGit
   * @desc Initializes a new Git repository.
   * This method performs Git initialization, sets up the remote origin, and optionally
   * makes the first commit and pushes it to the remote repository.
   * @example
   * await this.initGit();
   */
  private async initGit() {
    // 0. .git이 이미 존재하는 프로젝트라면 예외 처리
    const sPath = this.FileUtil.makePath(this.sWorkDir, '.git')
    if (await this.FileUtil.checkExist(sPath)) {
      throw new AlreadyExistException('.git')
    }

    // 1. git init 명령어 수행
    await this.Launcher.run('git', ['init'], this.sWorkDir)

    // 2. 관련 정보 취득 (prompt)
    Object.assign(this.gitInfo, await this.Prompt.call(INIT_SETTING))

    // 3. remote origin 설정
    this.Launcher.run('git', ['remote', 'add', 'origin', this.gitInfo.remoteUrl], this.sWorkDir)

    if (this.gitInfo.useFirstCommit) {
      // 4. first commit 수행
      await this.Launcher.run('git', ['add', '.'], this.sWorkDir)
      await this.Launcher.run('git', ['commit', '-m', ':sparkles: Project Initial'], this.sWorkDir)
      await this.Launcher.run('git', ['push', '-u', 'origin', 'master'], this.sWorkDir)
    }
  }

  /**
   * @name pushGit
   * @desc Performs a Git push operation.
   * This method stages all changes, commits them with a user-provided message,
   * and pushes the commit to the remote repository if the user has granted push permission.
   * @example
   * await this.pushGit();
   */
  private async pushGit() {
    //ENHANCE: fury.yaml 존재 확인 프로세스 추가 후 COMMIT_INFO[0].choices 수정

    // 1. commit 관련 정보 취득 (prompt)
    Object.assign(this.gitInfo, await this.Prompt.call(COMMIT_INFO))

    this.Logger.space()
    const pushRunner = this.Spinner.start('📤 Push Commit to Remote Repo...')

    // 2. Changes를 Staged로 이관
    await this.Launcher.run('git', ['add', '.'], this.sWorkDir)

    // 3. Commit 수행
    await this.Launcher.run('git', [
      'commit',
      '-m',
      `${this.gitInfo.commitType} ${this.gitInfo.commitMessage} `,
      this.sWorkDir
    ])

    // 4. Push 수행
    if (this.gitInfo.pushPermission) {
      await this.Launcher.run('git', ['push', '-u', 'origin'], this.sWorkDir)
    }

    this.Spinner.success(pushRunner, '📤 Push Commit to Remote Repo')
  }

  /**
   * @name pullGit
   * @desc Performs a Git pull operation.
   * This method pulls the latest changes from the remote repository for the current branch,
   * ensuring that the remote branch exists before attempting to pull.
   * @example
   * await this.pullGit();
   */
  private async pullGit() {
    // 1. 현재 Branch 정보 취득
    const sCurrentBranch = await this.getBranchList('current')

    // 2. 전체 Branch 정보 취득
    const sAllBranchList = await this.getBranchList('all')

    // 3. Remote에 해당 Branch가 존재하는지 확인
    const bRemoteBranchExists = sAllBranchList.split('\n').some(sBranch => {
      if (sBranch.split('/').length > 1) {
        const arrBranchInfo = sBranch.split('/')

        if (arrBranchInfo[arrBranchInfo.length - 1] === sCurrentBranch) {
          return true
        }
      }
    })

    if (!bRemoteBranchExists) {
      throw new GitException('remoteNotExist')
    }

    // 4. Pull 수행
    const pullRunner = this.Spinner.start('📩  Pulling changes...')
    await this.Launcher.run('git', ['pull', 'origin', sCurrentBranch], this.sWorkDir)
    this.Spinner.success(pullRunner, '📩  Pull changes')
  }

  /**
   * @name mergeGit
   * @desc Performs a Git merge operation.
   * This method merges a selected branch into the current branch. If the target branch is a remote branch,
   * it first pulls the latest changes from the remote. If merge conflicts occur, it prompts the user to resolve them.
   * @example
   * await this.mergeGit();
   */
  private async mergeGit() {
    // 1. 현재 Branch 정보 취득
    const sCurrentBranch = await this.getBranchList('current')

    // 2. 전체 Branch 정보 취득
    const sAllBranchList = await this.getBranchList('all')

    // 2-1. Branch 목록 가공   
    BRANCH_LIST[0].choices = sAllBranchList.split('\n')
      .filter(sBranch => !sBranch.includes('->') && !sBranch.includes(sCurrentBranch))
      .map(sBranch => {
        const sBranchName = sBranch.replace('*', '').trim()
        return { title: sBranchName, value: sBranchName }
      })

    // 3. 대상 Branch 취득 (prompt)
    const branchInfoResponse = await this.Prompt.call(BRANCH_LIST)
    Object.assign(this.gitInfo, branchInfoResponse)

    const sBranch = this.gitInfo.targetBranch.split('/').pop()
    this.Logger.space()

    // 4. Merge 수행
    const mergeRunner = this.Spinner.start(`✨ Merging \x1b[32m${sCurrentBranch} \x1b[0m ← \x1b[35m${sBranch} \x1b[0m`)

    // 4-1. merge 대상이 remote라면 pull 수행
    if (this.gitInfo.targetBranch.includes('remotes')) {
      await this.Launcher.run('git', ['pull', 'origin', `${sBranch} `], this.sWorkDir)
    }

    try {
      await this.Launcher.run('git', ['merge', `${sBranch} `], this.sWorkDir)
      this.Spinner.success(mergeRunner, `✨ \x1b[32m${sCurrentBranch} \x1b[0m ← \x1b[35m${sBranch} \x1b[0m have been merged`)
    } catch (error: any) {
      // 4-2. 에러가 발생하였다면, 유저에게 완료가 되었는지 여부 확인 후 병합 종료 커맨드 실행
      mergeRunner.fail()
      this.Logger.error(error.message)

      this.Logger.space()
      const mergeCompleteResponse = await this.Prompt.call(MERGE_INFO)

      if (mergeCompleteResponse?.mergeComplete) {
        // 4-3. 완료되었다면, continue 수행
        mergeRunner.start('💀 Resolving merge conflicts...')
        await this.Launcher.run('git', ['merge', '--continue'], this.sWorkDir)
        this.Spinner.success(mergeRunner, '💀 Merge Conflict Resolution')
      }
    }
  }

  /**
   * @name branchManage
   * @desc Manages Git branches (change, create, rename, delete).
   * This method handles various branch-related operations, prompting the user for
   * necessary information and executing the corresponding Git commands.
   * @example
   * await this.branchManage();
   */
  private async branchManage(): Promise<void> {
    // 0. subCommand 정보 취득 (prompt)
    Object.assign(this.gitInfo, await this.Prompt.call(BRANCH_COMMAND))

    const command: string[] = []

    switch (this.gitInfo.branchCommand) {
      // 1. 변경
      case 'switch': {
        // 1-1. 필요 정보 취득 (prompt)
        const sCurrentBranch = await this.getBranchList('current')
        const sAllBranchList = await this.getBranchList('all')

        BRANCH_LIST[0].choices = sAllBranchList.split('\n')
          .filter(sBranch => !sBranch.includes('remote') && !sBranch.includes(sCurrentBranch))
          .map(sBranch => {
            const sBranchName = sBranch.replace('*', '').trim()
            return { title: sBranchName, value: sBranchName }
          })

        const branchInfoResponse = await this.Prompt.call(BRANCH_LIST)
        Object.assign(this.gitInfo, branchInfoResponse)

        // 1-2. 수행
        command.push('switch', `${this.gitInfo.targetBranch} `)

        break
      }

      // 2. 생성
      case 'create': {
        // 2-1. 필요 정보 취득 (prompt)
        const sAllBranchList = await this.getBranchList('all')

        BRANCH_LIST[0].choices = sAllBranchList.split('\n')
          .filter(sBranch => !sBranch.includes('->') && !sBranch.includes('remote'))
          .map(sBranch => {
            const sBranchName = sBranch.replace('*', '').trim()
            return { title: sBranchName, value: sBranchName }
          })

        Object.assign(this.gitInfo, await this.Prompt.call(BRANCH_LIST))
        Object.assign(this.gitInfo, await this.Prompt.call(BRANCH_INFO))

        // 2-2. 수행
        command.push('switch', '-c', this.gitInfo.targetName, this.gitInfo.targetBranch)

        break
      }

      // 3. 이름 변경
      case 'rename': {
        // 3-1. 필요 정보 취득 (prompt)
        await this.Prompt.call([])
        const sCurrentBranchName = await this.getBranchList('current')

        // 3-2. Local 브랜치명 변경
        command.push('branch', '-m', `${sCurrentBranchName} `, ` < new- name > `)

        break
      }

      // 4. 삭제
      case 'delete': {
        // 4-1. 필요 정보 취득 (prompt)
        await this.Prompt.call([])

        // 4-2. Local 삭제
        command.push('branch', '-D', ``)

        // 4-3. Remote 삭제
        // if

        break
      }
    }

    this.Logger.space()
    const branchRunner = this.Spinner.start('🤔 Working...')
    try {
      await this.Launcher.run('git', command, this.sWorkDir)
      this.Spinner.success(branchRunner, '😎 Done!')
    } catch (error: any) {
      branchRunner.fail()
      this.Logger.error(error.message)
    }
  }

  /**
   * @name getBranchList
   * @desc Retrieves the list of branches.
   * This method retrieves either the current branch or all branches, depending on the provided type.
   * @param {'current' | 'all'} type - The type of branch list to retrieve ('current' for the current branch, 'all' for all branches).
   * @returns {Promise<string>} - The list of branches as a string.
   * @example
   * const currentBranch = await this.getBranchList('current');
   * const allBranchList = await this.getBranchList('all');
   */
  private async getBranchList(type: 'current' | 'all'): Promise<string> {
    switch (type) {
      case 'current': {
        const sBranchList = await this.Launcher.run('git', ['branch'], this.sWorkDir)
        const sCurrentBranch = sBranchList.split('\n').find(sBranch => sBranch.includes('*'))!.replace('*', '').trim()

        if (sCurrentBranch === undefined) {
          throw new NoDataException('currentBranch')
        }

        return sCurrentBranch
      }

      case 'all': {
        const sAllBranchList = await this.Launcher.run('git', ['branch', '-a'], this.sWorkDir)
        return sAllBranchList
      }
    }
  }
}
