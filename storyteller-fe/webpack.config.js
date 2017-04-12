var webpack = require('webpack');
var path = require('path')

var conf = {
    entry: {
        author: path.join(__dirname, 'src/author.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['latest', 'react', 'stage-2']
                }
            }
        ]
    },

    devtool: 'source-maps',

    devServer: {
        port: 4711,
        contentBase: 'dist',
        inline: true
    }
}
module.exports = conf;