import rollupTypescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image';
import autoExternal from 'rollup-plugin-auto-external';

const common = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [image(), autoExternal()],
};

export default [
  {
    ...common,
    plugins: [
      ...common.plugins,
      rollupTypescript({
        tsconfig: './tsconfig.build.json',
        tsconfigOverride: {
          compilerOptions: {
            baseUrl: '.',
            emitDeclarationOnly: true,
          },
        },
      }),
    ],
  },
  {
    ...common,
    plugins: [
      ...common.plugins,
      rollupTypescript({
        tsconfig: './tsconfig.build.json',
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
    ],
  },
];
