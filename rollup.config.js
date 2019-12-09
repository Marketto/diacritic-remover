import rollupPluginTs from "@wessberg/rollup-plugin-ts";
import pkg from './package.json';
import tsconfig from './tsconfig.json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import license from 'rollup-plugin-license';
import path from 'path';


const baseConf = {
    input: 'src/diacritic-remover.ts',
    external: [
        ...Object.keys(pkg.dependencies || {}),
        'i18n/all'
    ],
    plugins: [
        //rollupPluginTs({}),
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
} 

export default [
    {
        ...baseConf,
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true
            }
        ],
        plugins: [
            rollupPluginTs({}),
            ...baseConf.plugins
        ]
    },
    {
        ...baseConf,
        output: [
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true
            },
            {
                file: 'dist/diacritic-remover.bundle.min.js',
                format: 'iife',
                name: 'DiacriticRemover',
                sourcemap: true
            }
        ],
        plugins: [
            rollupPluginTs({
                tsconfig: {
                    ...tsconfig.compilerOptions,
                    declaration: false
                }
            }),
            ...baseConf.plugins
        ]
    }
];