import rollupTypescript from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import license from 'rollup-plugin-license';
import path from 'path';

export default {
    input: 'src/diacritic-remover.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        },
        {
            file: pkg.browser,
            format: 'iife',
            name: 'DiacriticFilter'
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        'i18n/all'
    ],
    plugins: [
        rollupTypescript({ typescript, tsconfig: './src/tsconfig.json' }),
        builtins(),
        terser(),
        license({
            cwd: __dirname,
            banner: {        
                content: {
                  file: path.join('.', 'src/banner'),
                },
              },        
        }),
    ],
};