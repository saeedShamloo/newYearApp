// development config
const merge = require('webpack-merge'),
 commonConfig = require('./common'),
 webpack = require('webpack');

module.exports = merge(commonConfig, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/auth': 'http://localhost:8080'
        },
    },
});