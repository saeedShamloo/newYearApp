const path = require('path'),
    webpack = require('webpack'),
    HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
              {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/',
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({template: "./index.html", filename: "./index.html", }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/auth': 'http://localhost:8080'
        },
      },
}