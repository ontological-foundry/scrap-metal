import esbuild from 'esbuild'
import { cleanPlugin } from 'esbuild-clean-plugin'
import { constants } from 'node:fs'
import { copyFile } from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log('DIR', path.join(__dirname, '../static/index.html'))

esbuild
  .build({
    entryPoints: ['src/App.tsx'],
    assetNames: 'asset/[name]-[hash]',
    chunkNames: '[ext]/[name]-[hash]',
    outdir: 'dist',
    bundle: true,
    metafile: true,
    format: 'esm',
    splitting: true,
    plugins: [
      cleanPlugin({
        verbose: true,
      }),
    ],
    define: {
      'process.env.TARGET': JSON.stringify(process.env.TARGET ?? 'production'),
      'process.env.API_PORT': 9000,
      'process.env.API_URL': 'https://api.projectscrapmetal.com',
    },
  })
  .then(async result => {
    if (result.errors.length > 0) {
      console.error('errors Encountered', result)
      return
    }

    await copyFile(
      path.join(__dirname, '../static/index.html'),
      path.join(__dirname, '../dist/index.html'),
      constants.COPYFILE_FICLONE
    )

    console.log('Build Complete, Warnings:', result.warnings)
  })
