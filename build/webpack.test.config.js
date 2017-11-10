//生产环境
var webpack = require('webpack')
var config = require('./webpack.base.config')
var path = require('path')
var StringReplacePlugin = require('string-replace-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')

//项目名字
var projectName = '/'

//生成测试环境目录
config.output.path=path.resolve(__dirname, '../dist/test')

//打包api 替换
config.module.loaders=(config.module.loaders || []).concat([
    { 
        test: path.resolve(__dirname, '../src' + projectName + 'assets/common/js/config.js'),
        loader: StringReplacePlugin.replace({
            replacements: [
                {
                    pattern: /127.0.0.1:5000/g,
                    replacement: function (match, p1, offset) {
                        return 'test.oms.morning-star.cn'
                    }
                },
                {
                    pattern: /127.0.0.1:4000/g,
                    replacement: function (match, p1, offset) {
                        return 'test.venus.morning-star.cn'
                    }
                }
            ]})
    }
])

config.devtool = '#source-map'

config.plugins = (config.plugins || []).concat([
    // 清除上一次生成的文件
    new CleanPlugin(path.resolve(__dirname, '../dist/test')),
    //string替换
    new StringReplacePlugin(),
    // This minifies not only JavaScript, but also
    // the templates (with html-minifier) and CSS (with cssnano)!
    //弱化警告信息
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
])


module.exports = config





