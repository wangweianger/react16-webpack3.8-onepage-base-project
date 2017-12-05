//生产环境
const webpack = require('webpack')
const config = require('./webpack.base.config')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HttpPushWebpackPlugin = require('http-push-webpack-plugin')  //http-push
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

//生成生产环境目录
config.output.path=path.resolve(__dirname, '../dist/test')

// loaders
config.module.rules = (config.module.rules || []).concat([{
    // index.html script脚本引入
    test: path.resolve(__dirname, '../src/index.html'),
    loader: 'webpack-dll-loader',
    exclude: '/node_modules/',
    options:{
        publicPath:'/libs/',
        manifest:path.resolve(__dirname, '../dist/test/libs/vendor-manifest.json')
    }
},{
    //打包字符串替换
    test: path.resolve(__dirname, '../src/assets/common/js/configs.js'),
    loader: 'string-replace-loader',
    exclude: '/node_modules/',
    query: {
        multiple: [
            { search: /123456/, replace: '987654321' },
        ]
    }
}])

// 插件
config.plugins = (config.plugins || []).concat([
    // 增加DllReferencePlugin配置
    new webpack.DllReferencePlugin({
        context:path.join(__dirname, '../dist/test/libs'), 
        manifest: require('../dist/test/libs/vendor-manifest.json')
    }),
    // 清除上一次生成的文件
    new CleanWebpackPlugin(['test/js'], {
        root: path.resolve(__dirname, '../dist'),
        verbose: true,
        dry: false,
    }),
    // 多线程压缩
    new ParallelUglifyPlugin({
        // 支持es6打包
        uglifyES: {
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
])
config.devtool = '#source-map'


module.exports = config







