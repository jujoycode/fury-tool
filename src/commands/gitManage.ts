import { Command } from './'
import { GIT_INIT_PROMPT, INIT_SETTING, COMMIT_INFO, BRANCH_LIST, MERGE_INFO } from '../constants'
import { GitException, AlreadyExistException, NoDataException } from '../exception'

import { GitInfo } from '../interfaces/git'

export class GitManage extends Command {
  private gitInfo: GitInfo = {} as GitInfo
  private sWorkDir: string = process.cwd()

  /**
 * @name prepare
 * @desc Prepare the project by collecting user inputs.
 * @example
 * await command.prepare();
 */
  async prepare(): Promise<void> {
    // 0. Child Command 선택
    const gitInitResponse = await this.Prompt.call(GIT_INIT_PROMPT)
    this.CommonUtil.validateRequireFields(
      gitInitResponse,
      GIT_INIT_PROMPT.map(prompt => String(prompt.name))
    )

    Object.assign(this.gitInfo, gitInitResponse)

    // 1. init을 제외한 커맨드에서 validation 수행
    if (this.gitInfo.subCommand !== 'init') {
      await this.checkValidation()
    }
  }

  /**
 * @name execute
 * @desc Execute the project creation.
 * @example
 * await command.execute();
 */
  async execute(): Promise<void> {
    switch (this.gitInfo.subCommand) {
      case 'init': {
        await this.initGit()
        break
      }

      case 'push': {
        await this.pushGit()
        break
      }

      case 'pull': {
        await this.pullGit()
        break
      }

      case 'merge': {
        await this.mergeGit()
        break
      }

      case 'branch': {
        await this.branchManage()
        break
      }
    }
  }

  /**
 * @name finalize
 * @desc Finalize the project creation process.
 * @example
 * await command.finalize();
 */
  async finalize(): Promise<void> {
    //ENHANCE: -. gitManage에선 굳이 필요한가?
  }

  /**
 * @name rollback
 * @desc Rollback the project creation in case of failure.
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
   * @desc Checks for the existence of the .git directory and throws an error if it does not exist.
   * @example await this.checkValidation();
   */
  private async checkValidation() {
    // 0. git 설치 여부 검증
    try {
      await this.Launcher.run('git', ['-v'])
    } catch (error) {
      throw new GitException('notInstall')
    }

    // 1. .git 파일 존재 검증
    const sPath = this.FileUtil.makePath(this.sWorkDir, '.git')
    const bCheckFlag = await this.FileUtil.checkExist(sPath)

    if (!bCheckFlag) {
      throw new GitException('init')
    }
  }

  /**
   * @name initGit
   * @desc Performs Git initialization.
   * @example await this.initGit();
   */
  private async initGit() {
    // 0. git이 설치되어있지 않거나 .git이 이미 존재하는 프로젝트라면 예외 처리
    try {
      await this.Launcher.run('git', ['-v'])
    } catch (error) {
      throw new GitException('notInstall')
    }

    const sPath = this.FileUtil.makePath(this.sWorkDir, '.git')
    if (await this.FileUtil.checkExist(sPath)) {
      throw new AlreadyExistException('.git')
    }

    // 1. git init 명령어 수행
    await this.Launcher.run('git', ['init'], this.sWorkDir)

    // 2. 관련 정보 취득 (prompt)
    const response = await this.Prompt.call(INIT_SETTING)
    this.CommonUtil.validateRequireFields(
      response,
      INIT_SETTING.map(prompt => String(prompt.name))
    )
    Object.assign(this.gitInfo, response)

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
   * @desc Performs Git push operation.
   * @example await this.pushGit();
   */
  private async pushGit() {
    //ENHANCE: fury.yaml 존재 확인 프로세스 추가 후 COMMIT_INFO[0].choices 수정

    // 1. commit 관련 정보 취득 (prompt)
    const response = await this.Prompt.call(COMMIT_INFO) //ENHANCE: 추후, fury.yaml 파일을 통해 커스텀 가능하게 고도화
    this.CommonUtil.validateRequireFields(
      response,
      COMMIT_INFO.map(prompt => String(prompt.name))
    )
    Object.assign(this.gitInfo, response)

    this.Logger.space()
    const pushRunner = this.Spinner.start('📤 Push Commit to Remote Repo...')

    // 2. Changes를 Staged로 이관
    await this.Launcher.run('git', ['add', '.'], this.sWorkDir)

    // 3. Commit 수행
    await this.Launcher.run('git', [
      'commit',
      '-m',
      `${this.gitInfo.commitType} ${this.gitInfo.commitMessage}`,
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
   * @desc Performs Git pull operation.
   * @example await this.pullGit();
   */
  private async pullGit() {
    // 1. 현재 Branch 정보 취득
    const sCurrentBranch = await this.getBranchList('current')

    // 2. 전체 Branch 정보 취득
    const sAllBranchList = await this.getBranchList('all')

    // 3. Remote에 해당 Branch가 존재하는지 확인
    const bExistFlag = sAllBranchList.split('\n').some(sBranch => {
      if (sBranch.split('/').length > 1) {
        const arrBranchInfo = sBranch.split('/')

        if (arrBranchInfo[arrBranchInfo.length - 1] === sCurrentBranch) {
          return true
        }
      }
    })

    if (!bExistFlag) {
      throw new GitException('remoteNotExist')
    }

    // 4. Pull 수행
    const pullRunner = this.Spinner.start('📩  Pulling changes...')
    await this.Launcher.run('git', ['pull', 'origin', sCurrentBranch], this.sWorkDir)
    this.Spinner.success(pullRunner, '📩  Pull changes')
  }

  /**
   * @name mergeGit
   * @desc Performs Git merge operation.
   * @example await this.mergeGit();
   */
  private async mergeGit() {
    // 1. 현재 Branch 정보 취득
    const sCurrentBranch = await this.getBranchList('current')

    // 2. 전체 Branch 정보 취득
    const sAllBranchList = await this.getBranchList('all')

    // 2-1. Branch 목록 가공
    const promptData: { title: string, value: string }[] = []
    sAllBranchList.split('\n').forEach(sBranch => {
      //NOTE: HEAD와 같은 명칭의 branch는 대상에서 제외
      if (sBranch.includes('->') || sBranch.includes(sCurrentBranch)) {
        return
      }

      const data = sBranch.replace('*', '').trim()
      promptData.push({ title: data, value: data })
    })

    // 3. 대상 Branch 취득 (prompt)
    BRANCH_LIST[0].choices = promptData

    const branchInfo = await this.Prompt.call(BRANCH_LIST)
    this.CommonUtil.validateRequireFields(branchInfo, BRANCH_LIST.map(prompt => String(prompt.name)))
    Object.assign(this.gitInfo, branchInfo)

    const sBranch = this.gitInfo.targetBranch.split('/').pop()
    this.Logger.space()

    // 4. Merge 수행
    const mergeRunner = this.Spinner.start(`✨ Merging \x1b[32m${sCurrentBranch}\x1b[0m ← \x1b[35m${sBranch}\x1b[0m`)

    // 4-1. merge 대상이 remote라면 pull 수행
    if (this.gitInfo.targetBranch.includes('remotes')) {
      await this.Launcher.run('git', ['pull', 'origin', `${sBranch}`], this.sWorkDir)
    }

    try {
      await this.Launcher.run('git', ['merge', `${sBranch}`])
      this.Spinner.success(mergeRunner, `✨ \x1b[32m${sCurrentBranch}\x1b[0m ← \x1b[35m${sBranch}\x1b[0m have been merged`)
    } catch (error: any) {
      // 4-2. 에러가 발생하였다면, 유저에게 완료가 되었는지 여부 확인 후 병합 종료 커맨드 실행
      mergeRunner.fail()
      this.Logger.error(error.message)

      this.Logger.space()
      await this.Prompt.call(MERGE_INFO)

      // 4-3. 완료되었다면, continue 수행
      mergeRunner.start('💀 Resolving merge conflicts...')
      await this.Launcher.run('git', ['merge', '--continue'])
      this.Spinner.success(mergeRunner, '💀 Merge Conflict Resolution')
    }
  }

  /**
   * @name branchManage
   * @desc Performs related to Git Branch management.
   * @example await this.branchManage()
   */
  private async branchManage() {
    // 0. subCommand 정보 취득 (prompt)
    await this.Prompt.call([])

    switch ('') {
      case '': {
        // --------------------------------------------
        // 1. 생성
        // 1-1. 필요 정보 취득 (prompt)
        await this.Prompt.call([])

        // 1-2. 수행
        // git checkout -b `${sBranchName}`

        break
      }
    }

    // --------------------------------------------
    // 2. 이름 변경
    // 2-1. 필요 정보 취득 (prompt)
    await this.Prompt.call([])

    // 2-2. 수행
    const sBranchName = await this.getBranchList('current')
    await this.Launcher.run('git', ['branch', '-m', `${sBranchName}`, `sNewBranchName`])

    // --------------------------------------------
    // 3. 삭제
    // 3-1. 필요 정보 취득 (prompt)
    await this.Prompt.call([])

    // 3-2. 수행
    // git branch -d currentBranch
  }

  /**
   * @name
   * @desc
   * @example await this.getBranchList()
   */
  private async getBranchList(type: 'current' | 'all') {
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
