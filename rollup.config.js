import rollupTypescript from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';

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
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        rollupTypescript({ typescript, tsconfig: './src/tsconfig.json' }),
        builtins(),
        terser(),
    ],
};