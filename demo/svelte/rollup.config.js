import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;
const preprocess = sveltePreprocess({
    postcss: {
        plugins: [require("autoprefixer")],
    },
    scss: {
        includePaths: ["src"],
    },
});

export default {
    input: "src/main.js",
    output: {
        file: "public/build/bundle.js",
        format: "iife",
        name: "app",
        sourcemap: true,
    },
    plugins: [
        svelte({
            dev: !production,
            preprocess,
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration —
        // consult the documentation for details:
        // https://github.com/rollup/rollup-plugin-commonjs
        resolve({
            browser: true,
            dedupe: importee => importee === "svelte" || importee.startsWith("svelte/")
        }),
        commonjs(),
        postcss({
            extract: true,
            minimize: true,
            use: [
                [
                    "sass",
                    {
                        includePaths: [
                            "./theme",
                            "./node_modules",
                        ],
                    },
                ],
            ],
        }),
        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload("public"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    }
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
                    shell: true,
                    stdio: ["ignore", "inherit", "inherit"],
                });
            }
        }
    };
}