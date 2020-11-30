/* eslint-disable @typescript-eslint/no-var-requires */
const { series } = require('gulp')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const { rollup } = require('rollup')
const {
    Extractor,
    ExtractorConfig,
    ExtractorResult,
} = require('@microsoft/api-extractor')
const log = {
    progress: text => {
        console.log(chalk.green(text))
    },
    error: text => {
        console.log(chalk.red(text))
    },
}

const paths = {
    root: path.join(__dirname, '/'),
    dist: path.join(__dirname, '/dist'),
}

// 删除 dist 文件
const clearLibFile = async cb => {
    fs.removeSync(paths.lib)
    log.progress('Deleted lib file')
    cb()
}


// api-extractor 整理 .d.ts 文件
const apiExtractorGenerate = async cb => {
    const apiExtractorJsonPath = path.join(__dirname, './api-extractor.json')
    // 加载并解析 api-extractor.json 文件
    const extractorConfig = await ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath)
    // 判断是否存在 index.d.ts 文件，这里必须异步先访问一边，不然后面找不到会报错
    const isExist = await fs.pathExists(extractorConfig.mainEntryPointFilePath)

    if (!isExist) {
        log.error('API Extractor not find index.d.ts')
        return
    }

    // 调用 API
    const extractorResult = await Extractor.invoke(extractorConfig, {
        localBuild: true,
        // 在输出中显示信息
        showVerboseMessages: true,
    })

    if (extractorResult.succeeded) {
        // 删除多余的 .d.ts 文件
        const removeList = ['tsdoc-metadata.json', 'interfaces', 'plugins']
        const libFiles = await fs.readdir(paths.dist)
        libFiles.forEach(async file => {
            if (file.endsWith('.d.ts') && !file.includes('index')) {
                await fs.remove(path.join(paths.dist, file))
            }
        })
        removeList.forEach(async file => {
            await fs.remove(path.join(paths.dist, file))
        })
        log.progress('API Extractor completed successfully')
        cb()
    } else {
        log.error(`API Extractor completed with ${extractorResult.errorCount} errors`
            + ` and ${extractorResult.warningCount} warnings`)
    }
}

const complete = cb => {
    log.progress('---- end ----')
    cb()
}




const build = series(apiExtractorGenerate, complete)

exports.build = build
