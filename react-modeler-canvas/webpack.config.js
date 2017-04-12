var webpack = require('webpack');
var path = require('path')

// https://docs.npmjs.com/misc/scripts

var conf = {
    entry: {
        index: path.join(__dirname, 'index.js')
    },
    output: {
        path: path.join(__dirname, 'lib'),
        filename: '[name].js',
        library: 'react-modeler-canvas',
        libraryTarget: 'umd'
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
    }
}
module.exports = conf;