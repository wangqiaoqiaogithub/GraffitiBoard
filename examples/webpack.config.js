const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')//引入分离插件
module.exports = {
    mode: 'development',
    modules:{
        rules:[
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',//这里我们需要调用分离插件内的extract方法
                    use: ['css-loader','prostcss-loader']
                })
            }
        ]
    }
}