import { Command } from './'
import { ProjectFactory } from '../factory'
import { PROJECT_INIT_PROMPT, USE_FRAMEWORK, USE_GIT } from '../constants'
import { markdownContent } from '../templates'

import { ProjectInfo } from '../interfaces/project'

/**
 * @name InitProject
 * @desc Class representing the initialization of a project.
 */
export class InitProject extends Command {
	private projectInfo: ProjectInfo = {} as ProjectInfo
	private sWorkDir: string = ''

	/**
	 * @name prepare
	 * @desc Prepare the project by collecting user inputs.
	 * @example
	 * await command.prepare();
	 */
	async prepare(): Promise<void> {
		// 0. Project 생성을 위한 기본 정보 취득 (prompt)
		const projectInitResponse = await this.Prompter.ask(PROJECT_INIT_PROMPT)
		Object.assign(this.projectInfo, projectInitResponse)

		// 0-1. Framework 종류 정보 취득 (prompt)
		if (this.projectInfo.useFramework) {
			const response = await this.Prompter.ask(USE_FRAMEWORK)
			Object.assign(this.projectInfo, response)
		}

		// 0-2. git remote URL 정보 취득 (prompt)
		if (this.projectInfo.useGit) {
			const response = await this.Prompter.ask(USE_GIT)
			Object.assign(this.projectInfo, response)
		}

		this.Logger.space()
	}

	/**
	 * @name execute
	 * @desc Execute the project creation.
	 * @example
	 * await command.execute();
	 */
	async execute(): Promise<void> {
		const createRunner = this.Spinner.start('Creating project...')

		try {
			// 1. Factory 생성
			const factory = new ProjectFactory(this.projectInfo).getFactory()

			// 2. Project Setup
			await factory.setup()

			// 3. get project path
			this.sWorkDir = factory.getWorkDir()

			// 4. logging
			this.Spinner.success(createRunner, `✨ Creating project \x1b[35min\x1b[0m ${this.sWorkDir}`)
			this.Logger.space()
		} catch (error) {
			createRunner.fail()
			throw error
		}
	}

	/**
	 * @name finalize
	 * @desc Finalize the project creation process.
	 * @example
	 * await command.finalize();
	 */
	async finalize(): Promise<void> {
		// 3. 후처리
		// -------------------------------------------------------
		// 3-1. README.md 생성
		const writeRunner = this.Spinner.start('📝  Write README.md...')

		try {
			await this.FileUtil.createFile(
				this.sWorkDir,
				'README.md',
				markdownContent.replace(/{{projectName}}/g, this.projectInfo.projectName)
			)

			this.Spinner.success(writeRunner, '📝  Write README.md')
		} catch (error: any) {
			writeRunner.fail()
			this.Logger.error(error.message)
		}

		// 3-2. Git 사용 여부에 따라 Init 수행
		if (this.projectInfo.useGit) {
			const gitRunner = this.Spinner.start('🌴  Setup Git...')

			// 3-2-1. .gitignore 파일 생성
			await this.FileUtil.createFile(this.sWorkDir, '.gitignore', 'node_modules')

			try {
				// 3-2-2. git init 수행
				await this.Launcher.run('git', ['init', `--initial-branch=${this.projectInfo.defaultBranch!}`], this.sWorkDir)

				// 3-2-3. git remote add origin 수행
				await this.Launcher.run('git', ['remote', 'add', 'origin', this.projectInfo.remoteUrl!], this.sWorkDir)

				// 3-2-4. first push
				await this.Launcher.run('git', ['add', '.'], this.sWorkDir)
				await this.Launcher.run('git', ['commit', '-m', ':sparkles: Init Project'], this.sWorkDir)
				await this.Launcher.run('git', ['push', '-u', 'origin', 'main'], this.sWorkDir)

				this.Spinner.success(gitRunner, '🌴  Setup Git')
			} catch (error: any) {
				gitRunner.fail()
				this.Logger.error(error.message)
			}
		}

		// 3-3. prettier 사용 여부에 따라 .prettierrc 파일 생성
		if (this.projectInfo.usePrettier) {
			const prtRunner = this.Spinner.start('🎨  Setup Prettier...')

			try {
				await this.FileUtil.createFile(this.sWorkDir, '.prettierrc', '{ "semi": false }')
				this.Spinner.success(prtRunner, '🎨  Setup Prettier')
			} catch (error) {
				prtRunner.fail()
				throw error
			}
		}

		// -------------------------------------------------------
		// 4. Package 설치
		const pkgRunner = this.Spinner.start('📦  Installing dependencies...')

		try {
			const output = await this.Launcher.run(
				this.projectInfo.packageManager,
				['install'],
				this.sWorkDir
			)

			this.Spinner.success(pkgRunner, '📦  Install dependencies\n')
			this.Logger.system(output)

			// 5. logging
			this.Logger.space()
			this.Logger.system(
				`🎉  Successfully created project \x1b[33m${this.projectInfo.projectName}\x1b[0m.`
			)
			this.Logger.system(
				`👉  Get started with the following commands:\n    $ \x1b[33mcd\x1b[0m ${this.projectInfo.projectName}\n    $ code .`
			)
		} catch (error) {
			pkgRunner.fail()
			throw error
		}
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
}
