// development config
const merge = require('webpack-merge'),
 commonConfig = require('./common'),
 webpack = require('webpack');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool : 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    ],
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/auth': 'http://localhost:9090',
            '/api': 'http://localhost:9090',
        },
    },
});