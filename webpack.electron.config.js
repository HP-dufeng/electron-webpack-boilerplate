const path = require('path');
const webpack = require('webpack');

const config = {
    entry: './app/main',
    output: {
        path: path.resolve(__dirname, 'app/dist'),
        filename: 'main.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }        
        ]
    },
    devtool: 'source-map',
    target: 'electron-main',
    node: {
        __dirname: false,
        __filename: false
    },
};

module.exports = config;
