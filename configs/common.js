const HtmlWebPackPlugin = require('html-webpack-plugin'),
 path = require('path');

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname,'../dist') ,
        publicPath: '/',
        filename: '[name].js'
    },

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
    ],
};