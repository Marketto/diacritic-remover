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
    input: "src/diacritic-remover.ts",
    output: {
        name: "DiacriticRemover",
        sourcemap: true,
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

const rollupBrowserConf = rollupPluginTs({
    tsconfig: {
        ...tsconfig.compilerOptions,
        declaration: false,
        module: "iife",
        target: "ES2015",
    },
});
const rollupModuleConf = rollupPluginTs({
    tsconfig: {
        ...tsconfig.compilerOptions,
        declaration: false,
        module: "ESNext",
        target: "ESNext",
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
            rollupPluginTs({}),
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
