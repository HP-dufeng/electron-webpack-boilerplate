import path from 'path';
import webpack from 'webpack';
import { spawn } from 'child_process';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
    entry: './app/src/index.js',
    output: {
        path: path.resolve(__dirname, 'app/dist'),
        filename: 'js/bundle.js',
        publicPath: '/' /** this is html src location */
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            favicon: './app/favicon.ico',
            filename: './index.html'
        }),
        new ExtractTextPlugin('css/style.css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                }),
                test: /\.css$/
            },
            {
                test: require.resolve('bootstrap'),
                use: 'imports-loader?jQuery=jquery, Tether=tether'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 40000, name: 'assets/[name]-[hash].[ext]' }
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        setup() {
            if (process.env.START_HOT) {
                spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
                .on('close', code => process.exit(code))
                .on('error', spawnError => console.error(spawnError));
            }
        }
    }
};

module.exports = config;
