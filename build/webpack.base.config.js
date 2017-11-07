//webpack.base config
const webpack = require('webpack');
const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const PROT = process.env.PROT || 8000

// 多线程
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

//提取公共文件
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

//配置开始
const config = {
        entry: {
            main:[
                `webpack-dev-server/client?http://172.16.60.7:${PROT}/`,
                "webpack/hot/dev-server",
                path.resolve(__dirname, '../src/main.jsx')
            ]
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/',
            filename: '[name].js',
            chunkFilename: "[name].js"
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: "/node_modules/",
                loader: [ 'happypack/loader?id=js' ]
            },
            {
                test: /\.scss$/, 
                loader: [ 'happypack/loader?id=sass' ]
            },
            {
                test:/\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: "css-loader"
                })
            },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            },
            {
            　　test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            　　loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
        　　},
            {
            　　test: /\.(xlsx|xls)(\?.*$|$)/,
            　　loader: 'url-loader?importLoaders=1&limit=8192&name=files/[name].[ext]'
        　　},
        ]},
    //自动补全识别后缀
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
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
    devtool:"cheap-module-eval-source-map",
    //插件
    plugins: [
        //js 编译多线程 
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: [ 'env','react' ],
                }
            }],
        }),
        // sass 编译多线程
        new HappyPack({
            id: 'sass',
            threadPool: happyThreadPool,
            loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }),
        //提取css
        new ExtractTextPlugin("styles.css"),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['main'],
            minChunks: 1 // 提取所有entry共同依赖的模块
        }),
        //自动生成html文件
        new htmlWebpackPlugin({
            title:"首页",
            template:path.resolve(__dirname, '../src/index.html'),
            inject: true,
            hash: true,
            cache: true,
            chunks: ['main','vendors'],
            favicon:path.resolve(__dirname, '../favicon.ico'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: `http://127.0.0.1:${PROT}` })
    ],
}

module.exports = config;
