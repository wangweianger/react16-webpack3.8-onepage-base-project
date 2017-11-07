const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distpath = '../dist/production/libs';

module.exports = {
    // 你想要打包的模块的数组
    entry: {
        vendor: [
            'vue',
            'vuex',
            'vue-router',
            'jquery', 
            'zane-calendar',
            'common/js/format',
            'popup',
            'page',
            'common/lib/mixin/propsync',
            'common/js/jquery.cookie.js',
            'common/lib/bootstrap/css/bootstrap.css',
            'common/lib/bootstrap/js/bootstrap.js',
            'accounting',
        ]
    },
    output: {
        path: path.join(__dirname, distpath), // 打包后文件输出的位置
        filename: '[name]_[hash].js',
        library: '[name]_[hash]' 
    },
    module: {
        rules: [
            {
                test:/\.css$/, 
                loader: 'css-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            },
            {
            　　test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            　　loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
        　　 },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist/,
                loader: 'babel-loader',
                options: {
                    presets: [ 'env' ],
                }
            }, 
        ]
    },
    //自动补全识别后缀
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$:'vue/dist/vue.runtime.common.js',
            components: path.resolve(__dirname, '../src/components'),
            commonvue: path.resolve(__dirname, '../src/commonvue'),
            pages: path.resolve(__dirname, '../src/pages'),
            common: path.resolve(__dirname, '../src/assets/common'),
            assets:path.resolve(__dirname, '../src/assets'),
            popup: path.resolve(__dirname, '../src/assets/common/lib/popup/popup.js'),
            page: path.resolve(__dirname, '../src/assets/common/lib/page/page.js'),
        },
    },
    plugins: [
        // 清除上一次生成的文件
        new CleanWebpackPlugin(['production/libs'], {
            root: path.resolve(__dirname, '../dist'),
            verbose: true, 
            dry: false,
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, distpath, '[name]-manifest.json'),
            name: '[name]_[hash]', 
            context:path.join(__dirname, distpath), 
        }),
        // 压缩打包的文件，与该文章主线无关
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
};






