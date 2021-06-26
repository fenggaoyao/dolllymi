const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const buildTypes = true; //args.t || args.types || isRelease
const sourceMap = false; //args.sourcemap || args.s


const env = process.env.NODE_ENV || 'development'
const devOnly = env === 'development'

run()



async function run() {
    // if (isRelease) {
    //     // remove build cache for release builds to avoid outdated enum values
    //     await fs.remove(path.resolve(__dirname, '../node_modules/.rts2_cache'))
    // }
    const targets = (fs.readdirSync('packages').filter(f => {
        if (!fs.statSync(`packages/${f}`).isDirectory()) {
            return false
        }
        const pkg = require(`../packages/${f}/package.json`)
        if (pkg.private && !pkg.buildOptions) {
            return false
        }
        return true
    }).filter(f => !process.argv[2] ? true : [process.argv[2]].includes(f)))

    console.log(targets)
    await buildAll(targets)
    checkAllSizes(targets)
}
async function buildAll(targets) {
    await runParallel(require('os').cpus().length, targets, build)
}

async function runParallel(maxConcurrency, source, iteratorFn) {
    const ret = []
    const executing = []
    for (const item of source) {
        const p = Promise.resolve().then(() => iteratorFn(item, source))
        ret.push(p)

        if (maxConcurrency <= source.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1))
            executing.push(e)
            if (executing.length >= maxConcurrency) {
                await Promise.race(executing)
            }
        }
    }
    return Promise.all(ret)
}


async function build(target) {
    const pkgDir = path.resolve(`packages/${target}`)
    const pkg = require(`${pkgDir}/package.json`)

    // only build published packages for release
    if (pkg.private) {
        return
    }

    await fs.remove(`${pkgDir}/dist`)



    await execa(
        'rollup',
        [
            '-c',
            '--environment',
            [
                `NODE_ENV:${env}`,
                `TARGET:${target}`,
                buildTypes ? `TYPES:true` : ``,
                sourceMap ? `SOURCE_MAP:true` : ``
            ]
            .filter(Boolean)
            .join(',')
        ], {
            stdio: 'inherit'
        }
    )

}

function checkAllSizes(targets) {
    if (devOnly) {
        return
    }
    console.log()
    for (const target of targets) {
        checkSize(target)
    }
    console.log()
}

function checkSize(target) {
    const pkgDir = path.resolve(`packages/${target}`)
    checkFileSize(`${pkgDir}/dist/${target}.global.prod.js`)
}

function checkFileSize(filePath) {
    if (!fs.existsSync(filePath)) {
        return
    }
    const file = fs.readFileSync(filePath)
    const minSize = (file.length / 1024).toFixed(2) + 'kb'
    console.log(
        `${chalk.gray(
      chalk.bold(path.basename(filePath))
    )} min:${minSize}`
    )
}