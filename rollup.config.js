import {
    nodeResolve
} from '@rollup/plugin-node-resolve'
import chalk from 'chalk'
import path from 'path'
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import {
    terser
} from 'rollup-plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace';


if (!process.env.TARGET) {
    throw new Error('TARGET package must be specified via --environment flag.')
}

const masterVersion = require('./package.json').version

// ensure TS checks only once for each build
let hasTSChecked = false

// packages 文件夹路径
const packagesDir = path.resolve(__dirname, 'packages')

const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = (filename) => path.resolve(packageDir, filename)

const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}

const name = packageOptions.filename || path.basename(packageDir)

const outputConfigs = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: `es`
    },
    'esm-browser': {
        file: resolve(`dist/${name}.esm-browser.js`),
        format: `es`
    },
    cjs: {
        file: resolve(`dist/${name}.cjs.js`),
        format: `cjs`
    },
    global: {
        file: resolve(`dist/${name}.global.js`),
        format: `iife`
    }

}

const defaultFormats = ['esm-bundler', 'cjs']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')


const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const packageConfigs = packageFormats.map(format => createConfig(format, outputConfigs[format]))

if (process.env.NODE_ENV === 'production') {
    packageFormats.forEach(format => {
        if (packageOptions.prod === false) {
            return
        }
        if (format === 'cjs') {
            packageConfigs.push(createProductionConfig(format))
        }
        if (/^(global|esm-browser)?/.test(format)) {
            packageConfigs.push(createMinifiedConfig(format))
        }
    })
}

export default packageConfigs


// 公共插件配置
const plugins = [
    vue({
        target: 'browser',
        // Dynamically inject css as a <style> tag
        css: true
    }),
    css({
        output: 'bundle.css'
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    json(),
    nodeResolve(),
    commonjs(),
    esbuild()
]

// isProd || plugins.push(terser())



// module.exports = fs.readdirSync(root)
//     // 过滤，只保留文件夹
//     .filter(item => fs.statSync(path.resolve(root, item)).isDirectory())
//     //只打包某一个库
//     .filter(item => ["card"].includes(item))
//     // 为每一个文件夹创建对应的配置
//     .map(item => {
//         // const pkg = require(path.resolve(root, item, 'package.json'))
//         // const packageOptions = pkg.buildOptions || {}




//         const configs = packageConfigs(item);
//         console.log(item, configs.length)

//         for (const config of configs) {
//             return config;
//         }

//         // return {
//         //     input: path.resolve(root, item, packageOptions.entry),
//         //     output: [{
//         //             file: path.join(root, item, pkg.module),
//         //             format: 'es'
//         //         },
//         //         {
//         //             exports: 'named',
//         //             format: 'cjs',
//         //             file: path.join(root, item, pkg.module),
//         //         },
//         //         {
//         //             name: packageOptions.name,
//         //             file: path.join(root, item, pkg.unpkg),
//         //             format: 'iife',
//         //             globals: {
//         //                 vue: 'Vue'
//         //             }
//         //         },
//         //     ],
//         //     plugins: plugins,
//         //     external(id) {
//         //         return /^vue/.test(id)
//         //     }
//         // }
//     })

function createConfig(format, output, plugins = []) {
    if (!output) {
        console.log(chalk.yellow(`invalid format: "${format}"`))
        process.exit(1)
    }


    let entryFile = packageOptions.entry


    output.exports = 'auto'
    output.sourcemap = !!process.env.SOURCE_MAP
    output.externalLiveBindings = false

    const isProductionBuild =
        process.env.__DEV__ === 'false' || /\.prod\.js$/.test(output.file)
    const isBundlerESMBuild = /esm-bundler/.test(format)
    const isBrowserESMBuild = /esm-browser/.test(format)
    const isNodeBuild = format === 'cjs'
    const isGlobalBuild = /global/.test(format)

    if (isGlobalBuild) {
        output.name = packageOptions.name
    }

    const shouldEmitDeclarations =
        pkg.types && process.env.TYPES != null && !hasTSChecked

    // console.log("shouldEmitDeclarations",
    //     shouldEmitDeclarations)

    const tsPlugin = ts({
        check: false, //process.env.NODE_ENV === 'production' && !hasTSChecked,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
        tsconfigOverride: {
            compilerOptions: {
                sourceMap: output.sourcemap,
                declaration: shouldEmitDeclarations,
                declarationMap: shouldEmitDeclarations
            },
            exclude: ['**/__tests__', 'test-dts']
        }
    })
    // we only need to check TS and generate declarations once for each build.
    // it also seems to run into weird issues when checking multiple times
    // during a single build.
    hasTSChecked = true




    let external = []

    if (isGlobalBuild || isBrowserESMBuild) {

        if (packageOptions.type === 'component') {
            output.globals = {
                vue: 'Vue'
            }
            external = ['vue']
        }
    } else {
        // Node / esm-bundler builds.
        // externalize all deps unless it's the compat build.
        external = [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
            ...['path', 'url', 'stream'] // for @vue/compiler-sfc / server-renderer
        ]
    }



    const nodePlugins =
        format !== 'cjs' ? [
            // @ts-ignore
            commonjs({
                sourceMap: false
            }),
            nodeResolve()
        ] : []

    const VueComponentPlugins = packageOptions.type === 'component' ? [
        vue({
            target: 'browser',
            // Dynamically inject css as a <style.js> tag
            css: true
        }),
        css({
            output: `${name}.css`
        }),
        esbuild()

    ] : [
        tsPlugin
        // esbuild()
    ]

    const result = {
        input: resolve(entryFile),
        // Global and Browser ESM builds inlines everything so that they can be
        // used alone.
        external,
        plugins: [
            json({
                namedExports: false
            }),
            createReplacePlugin(
                isProductionBuild,
                isBundlerESMBuild,
                isBrowserESMBuild,
                // isBrowserBuild?
                (isGlobalBuild || isBrowserESMBuild || isBundlerESMBuild) &&
                !packageOptions.enableNonBrowserBranches,
                isGlobalBuild,
                isNodeBuild
            ),
            ...VueComponentPlugins,
            ...nodePlugins,
            ...plugins
        ],
        output,
        onwarn: (msg, warn) => {
            if (!/Circular/.test(msg)) {
                warn(msg)
            }
        },
        treeshake: {
            moduleSideEffects: false
        }
    }
    return result
}

function createReplacePlugin(
    isProduction,
    isBundlerESMBuild,
    isBrowserESMBuild,
    isBrowserBuild,
    isGlobalBuild,
    isNodeBuild

) {
    const replacements = {
        __DEV__: isBundlerESMBuild,
        __VERSION__: `"${masterVersion}"`,
        // If the build is expected to run directly in the browser (global / esm builds)
        __BROWSER__: isBrowserBuild,
        __GLOBAL__: isGlobalBuild,
        __ESM_BUNDLER__: isBundlerESMBuild,
        __ESM_BROWSER__: isBrowserESMBuild,
        __NODE_JS__: isNodeBuild,
        'process.env.NODE_ENV': isProduction

    }
    // allow inline overrides like
    //__RUNTIME_COMPILE__=true yarn build runtime-core
    Object.keys(replacements).forEach(key => {
        if (key in process.env) {
            replacements[key] = process.env[key]
        }
    })
    return replace({
        // @ts-ignore
        values: replacements,
        preventAssignment: true
    })
}

//增加生产环境的 cjs.prod.js
function createProductionConfig(format) {
    return createConfig(format, {
        file: resolve(`dist/${name}.${format}.prod.js`),
        format: outputConfigs[format].format
    })
}

//增加生产环境 global|esm-browser .prod</style.js 

function createMinifiedConfig(format) {
    return createConfig(
        format, {
            file: outputConfigs[format].file.replace(/\.js$/, '.prod.js'),
            format: outputConfigs[format].format
        },
        [
            terser({
                module: /^esm/.test(format),
                compress: {
                    ecma: 2015,
                    pure_getters: true
                },
                safari10: true
            })
        ]
    )
}