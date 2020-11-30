import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { dependencies } from './package.json'
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
            tsconfig: isDeclaration ? 'tsconfig.json' : 'tsconfig.build.json',
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
        }),
    )
    plugins.push(
        commonjs({
            sourceMap: false,
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
            format: 'cjs',
            name: 'SafeJsonTypePlugins',
        },
        plugins: getPlugins({
            isBrowser: false,
            isDeclaration: true,
            isMin: false,
        }),
    },
    {
        input: 'src/index.ts',
        external,
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            name: 'SafeJsonTypePlugins',
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