const merge = require('webpack-merge'),
 commonConfig = require('./common');

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [],
    optimization: {
        minimize: true,
    }
});
