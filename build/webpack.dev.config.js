//开发环境
const webpack = require('webpack')
const config = require('./webpack.base.config')
const WebpackDevServer = require('webpack-dev-server')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const PROT = process.env.PROT || 8000

config.entry.main = (config.entry.main || []).concat([   
    `webpack-dev-server/client?http://localhost:${PROT}/`,
    'webpack/hot/dev-server',
])
config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: `http://127.0.0.1:${PROT}` })
])
config.devtool='cheap-module-eval-source-map'

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    historyApiFallback:{
        index:'/index.html' 
    },
    stats: { 
        colors: true 
    },
    proxy: {
        '/api': {
            target: 'http://cloudStore-admin.morning-star.cn/',
            secure: false,
            pathRewrite: {'^/api' : '/'},
            changeOrigin: true,
        }
    }
})

server.listen(PROT)

console.log(`服务端启动的链接地址为：http://127.0.0.1:${PROT}`)
