//生产环境
var webpack = require('webpack')
var config = require('./webpack.base.config')
var path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HttpPushWebpackPlugin = require('http-push-webpack-plugin')  //http-push
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

//项目名字
var projectName = '/'

//生成生产环境目录
config.output.path=path.resolve(__dirname, '../dist/production')
config.output.filename ='js/[name].[hash].js',
config.output.chunkFilename ='js/[name].[hash].js'

// loaders
config.module.rules = (config.module.rules || []).concat([
    {
        // index.html script脚本引入
        test: path.resolve(__dirname, '../src' + projectName + 'index.html'),
        loader: 'webpack-dll-loader',
        exclude: '/node_modules/',
        options:{
            publicPath:'/libs/',
            manifest:path.resolve(__dirname, '../dist' + projectName + 'production/libs/vendor-manifest.json')
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
        context:path.join(__dirname, '../dist/production/libs'), 
        manifest: require('../dist/production/libs/vendor-manifest.json')
    }),
    // 清除上一次生成的文件
    new CleanWebpackPlugin(['production/js'], {
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
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
])

module.exports = config
