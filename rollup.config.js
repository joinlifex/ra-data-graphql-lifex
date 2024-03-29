import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const globals = {
  ...packageJson.devDependencies,
  'react': "react"
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs', // commonJS
      sourcemap: true,
      exports: 'named',
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Modules
      sourcemap: true,
      exports: 'named',
    },
  ],
  context: "globalThis",
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
    typescript({
      useTsconfigDeclarationDir: true
    }),
  ],
  external: Object.keys(globals),
};