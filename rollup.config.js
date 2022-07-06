import copy from 'rollup-plugin-copy'

import { writeFile, mkdir } from 'fs/promises'

function createCommonJsPackage() {
  const pkg = { type: 'commonjs' }
  return {
    name: 'cjs-package',
    buildEnd: async () => {
      await mkdir('./dist', { recursive: true })
      await writeFile('./dist/package.json', JSON.stringify(pkg, null, 2))
    }
  }
}

export default [
  {
    input: './src/index.js',
    plugins: [
      copy({
        targets: [
          { src: './package.json', dest: 'dist' }
        ]
      }),
      createCommonJsPackage()
    ],
    output: [
      { format: 'es', file: './dist/index.mjs' },
      { format: 'cjs', file: './dist/index.cjs' }
    ]
  }
]