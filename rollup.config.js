import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { dependencies } from './package.json'
import dts from 'rollup-plugin-dts'

const external = Object.keys(dependencies)
const env = process.env
const IS_PROD = env.NODE_ENV === 'production'
function getPlugins({ isBrowser = false, isMin = false, isDeclaration = false }) {
    const plugins = []
    plugins.push(
        nodeResolve({
            browser: isBrowser,
            preferBuiltins: true,
        }),
    )
    plugins.push(
        typescript({
            tsconfig: 'tsconfig.json',
            module: 'esnext',
            target: 'es2019', // node >= 12
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            sourceMap: true,
        }),
    )
    plugins.push(
        commonjs({
            sourceMap: true,
        }),
    )
    if (isMin) {
        plugins.push(
            terser({
                module: true,
            }),
        )
    }
    return plugins
}
export default [
    {
        input: 'src/index.ts', // 生成类型文件
        output: {
            dir: 'dist',
            format: 'esm',
            name: 'SafeJsonTypePlugins',
        },
        plugins: [dts()],
    },
    {
        input: 'src/browser.ts', // 生成类型文件
        output: {
            dir: 'dist',
            format: 'esm',
            name: 'SafeJsonTypePlugins',
        },
        plugins: [dts()],
    },
    {
        input: 'src/index.ts',
        external,
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            name: 'SafeJsonTypePlugins',
            sourcemap: true,
        },
        plugins: getPlugins({
            isBrowser: false,
            isDeclaration: false,
            isMin: false,
        }),
    },
    {
        input: 'src/index.ts',
        external,
        output: {
            file: 'dist/index.esm.js',
            format: 'esm',
            name: 'SafeJsonTypePlugins',
            sourcemap: true,
        },
        plugins: getPlugins({
            isBrowser: false,
            isDeclaration: false,
            isMin: false,
        }),
    },
    {
        input: 'src/browser.ts',
        output: {
            file: 'dist/browser.js',
            format: 'umd',
            name: 'SafeJsonTypePlugins',
            sourcemap: true,
        },
        plugins: getPlugins({
            isBrowser: true,
            isDeclaration: false,
            isMin: false,
        }),
    },
    {
        input: 'src/browser.ts',
        output: {
            file: 'dist/browser.min.js',
            format: 'umd',
            name: 'SafeJsonTypePlugins',
        },
        plugins: getPlugins({
            isBrowser: true,
            isDeclaration: false,
            isMin: IS_PROD,
        }),
    },
    {
        input: 'src/browser.ts',
        output: {
            file: 'dist/browser.esm.js',
            format: 'esm',
            name: 'SafeJsonTypePlugins',
            sourcemap: true,
        },
        plugins: getPlugins({
            isBrowser: true,
            isDeclaration: false,
            isMin: false,
        }),
    },
    {
        input: 'src/browser.ts',
        output: {
            file: 'dist/browser.esm.min.js',
            format: 'esm',
            name: 'SafeJsonTypePlugins',
        },
        plugins: getPlugins({
            isBrowser: true,
            isDeclaration: false,
            isMin: IS_PROD,
        }),
    },
]