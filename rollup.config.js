import rollupPluginTs from "@wessberg/rollup-plugin-ts";
import pkg from "./package.json";
import tsconfig from "./tsconfig.json";
import { terser } from "rollup-plugin-terser";
import builtins from "rollup-plugin-node-builtins";
import jsonPlugin from "@rollup/plugin-json";
import license from "rollup-plugin-license";
import path from "path";

const baseConf = {
    external: [
        ...Object.keys(pkg.dependencies || {}),
        "i18n/all",
    ],
    input: "src/classes/diacritic-remover.class.ts",
    output: {
        exports: "default",
        name: "DiacriticRemover",
        sourceMap: true,
    },
    plugins: [
        license({
            banner: {
                content: {
                  file: path.join(".", "src/banner"),
                },
            },
            cwd: __dirname,
            sourcemap: true,
        }),
    ],
};

const rollupCjsConf = rollupPluginTs({
    tsconfig: {
        ...tsconfig.compilerOptions,
        declaration: false,
    },
});
const rollupModuleConf = rollupPluginTs({
    tsconfig: {
        ...tsconfig.compilerOptions,
        declaration: true,
        module: "ESNext",
        target: "ESNext",
    },
});
const rollupBrowserConf = rollupPluginTs({
    tsconfig: {
        ...tsconfig.compilerOptions,
        declaration: false,
        module: "es2015",
        target: "ES2015",
    },
});

export default [
    {
        ...baseConf,
        output: {
            ...baseConf.output,
            file: pkg.main,
            format: "cjs",
        },
        plugins: [
            builtins(),
            rollupCjsConf,
            jsonPlugin({
                namedExports: false,
                preferConst: true,
            }),
            ...baseConf.plugins,
        ],
    },
    {
        ...baseConf,
        output: {
            ...baseConf.output,
            file: pkg.module,
            format: "esm",
        },
        plugins: [
            builtins(),
            rollupModuleConf,
            jsonPlugin({
                namedExports: false,
                preferConst: true,
            }),
            ...baseConf.plugins,
        ],
    },
    {
        ...baseConf,
        output: {
            ...baseConf.output,
            file: "dist/diacritic-remover.bundle.js",
            format: "iife",
        },
        plugins: [
            builtins(),
            rollupBrowserConf,
            jsonPlugin({
                namedExports: false,
                preferConst: true,
            }),
            ...baseConf.plugins,
        ],
    },
    {
        ...baseConf,
        output: {
            ...baseConf.output,
            file: "dist/diacritic-remover.bundle.min.js",
            format: "iife",
        },
        plugins: [
            builtins(),
            rollupBrowserConf,
            jsonPlugin({
                namedExports: false,
                preferConst: true,
            }),
            terser(),
            ...baseConf.plugins,
        ],
    },
];
