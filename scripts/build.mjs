import * as esbuild from 'esbuild'

await esbuild
	.build({
		entryPoints: ['src/app.ts'],
		outfile: 'dist/app.js',
		logLevel: 'info',
		bundle: true,
		minify: true,
		treeShaking: true,
		format: 'cjs',
		platform: 'node',
		tsconfig: 'tsconfig.json'
	})
	.then(() => {
		console.log('')
	})
	.catch(() => process.exit(1))
