import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
const plugins = [
    nodeResolve({
        browser: true,
        preferBuiltins: true,
    }),
    commonjs({
        sourceMap: false,
    }),
    typescript({
        tsconfig: 'tsconfig.build.json',
    }),
]
const pluginsAndTerser = plugins.concat([
    terser({
        module: true,
    }),
])
export default [
    {
        input: 'src/index.ts', // 生成类型文件
        output: {
            dir: 'dist',
            format: 'cjs',
            name: 'SafeJsonTypePlugins',
        },
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: true,
            }),
            commonjs({
                sourceMap: false,
            }),
            typescript({
                tsconfig: 'tsconfig.json',
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            name: 'SafeJsonTypePlugins',
        },
        plugins,
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.esm.js',
            format: 'esm',
            name: 'SafeJsonTypePlugins',
        },
        plugins,
    },

    {
        input: 'src/browser.ts',
        output: {
            file: 'dist/browser.min.js',
            format: 'umd',
            name: 'SafeJsonTypePlugins',
        },
        plugins: pluginsAndTerser,
    },
    {
        input: 'src/browser.ts',
        output: {
            file: 'dist/browser.esm.min.js',
            format: 'esm',
            name: 'SafeJsonTypePlugins',
        },
        plugins: pluginsAndTerser,
    },
]