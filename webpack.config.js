const webpack = require('webpack');
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        path.resolve('src/ts/index.ts'),
        path.resolve('src/pcss/index.pcss')
    ],
    output: {
        path: path.resolve('dist/'),
        filename: 'bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Josef Kuchař',
            filename: '../index.html',
            template: path.resolve('src/html/index.html'),
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                sortAttributes: true,
                sortClassName: true
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            comments: false,
            include: /\.js$/,
        })
    ],
    module: {
        rules: [
            // JS
            {
                test: [/\.ts/, /\.tsx/],
                use: 'awesome-typescript-loader'
            },
            // CSS
            {
                test: [/\.pcss/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ 
                            loader: 'css-loader',
                            options: { 
                                importLoaders: 1,
                                minimize: true
                            } 
                        },
                        'postcss-loader'
                    ]
                })
            }
        ]
    }
}