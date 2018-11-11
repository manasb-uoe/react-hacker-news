const webpackDevConfig = require('./webpack.dev');

webpackDevConfig.mode = 'production';
webpackDevConfig.devtool = 'source-map';

module.exports = webpackDevConfig;