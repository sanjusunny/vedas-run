const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = process.env.npm_lifecycle_event === 'build'

let htmlConfig = {
    filename: 'index.html',
    template: 'src/index.html'
};

if (isProduction) {
    htmlConfig.inlineSource = '.(js|css)$'
}

let config = {
    devServer: {
        host: '10.0.0.100',
        disableHostCheck: true
    },
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'script.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {"modules": false}]
                        ]
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin(htmlConfig),
        new HtmlWebpackInlineSourcePlugin()
    ],
    stats: 'minimal',
    devServer: {
        stats: 'minimal'
    }
}

if (!isProduction) {
    config.devtool = 'eval-source-map'
} else {
    config.plugins = config.plugins.concat([
        new webpack.optimize.ModuleConcatenationPlugin()
    ])
}

module.exports = config
