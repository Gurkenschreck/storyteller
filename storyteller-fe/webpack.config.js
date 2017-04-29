var webpack = require('webpack');
var path = require('path')

var conf = {
    entry: {
        modeler: path.join(__dirname, 'src/main-modeler.js')
    },
    output: {
        path: path.join(__dirname, 'www'),
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
        contentBase: 'www',
        inline: true
    }
}
module.exports = conf;