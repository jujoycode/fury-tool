import fs from 'fs/promises'
import path from 'path'
import * as esbuild from 'esbuild'

let DEBUG_FLAG = process.argv[2]
const sPath = path.join(process.cwd(), 'setting.json')

if (DEBUG_FLAG === '--product') {
	DEBUG_FLAG = false

	await fs.rm(sPath)
	await fs.writeFile(sPath, JSON.stringify({ logLevel: 'info' }, null, 2))
} else {
	DEBUG_FLAG = true

	await fs.rm(sPath)
	await fs.writeFile(sPath, JSON.stringify({ logLevel: 'debug' }, null, 2))
}

await esbuild
	.build({
		entryPoints: ['src/app.ts'],
		outfile: 'dist/app.js',
		logLevel: DEBUG_FLAG ? 'debug' : 'info',
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
