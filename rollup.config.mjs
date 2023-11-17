import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [
      typescript({
        lib: ['es2018'],
        target: 'es5'
      })
    ]
  },
  {
    input: 'dist/types/src/index.d.ts',
    output: [{ file: 'dist/types.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]
