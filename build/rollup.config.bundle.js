import {
    nodeResolve
} from '@rollup/plugin-node-resolve'
import fs from 'fs'
import path from 'path'
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import commonjs from '@rollup/plugin-commonjs'
import {
    terser
} from 'rollup-plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace';

const isProd = process.env.NODE_ENV !== 'production'

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

isProd || plugins.push(terser())

// packages 文件夹路径
const root = path.resolve(__dirname, '../packages')

module.exports = fs.readdirSync(root)
    // 过滤，只保留文件夹
    .filter(item => fs.statSync(path.resolve(root, item)).isDirectory())
    // 为每一个文件夹创建对应的配置
    .map(item => {
        const pkg = require(path.resolve(root, item, 'package.json'))
        const packageOptions = pkg.buildOptions || {}
        return {
            input: path.resolve(root, item, 'install.js'),
            output: [{
                    file: path.join(root, item, pkg.module),
                    format: 'es'
                },
                {
                    name: packageOptions.name,
                    file: path.join(root, item, pkg.unpkg),
                    format: 'iife',
                    globals: {
                        vue: 'Vue'
                    }
                },
            ],
            plugins: plugins,
            external(id) {
                return /^vue/.test(id)
            }
        }
    })