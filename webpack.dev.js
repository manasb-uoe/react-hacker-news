const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');

webpackCommon.entry = {
    main: './src/index.jsx'
};

webpackCommon.output = {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
};

webpackCommon.devServer = {
    contentBase: './dist'
};

webpackCommon.plugins = [
    ...webpackCommon.plugins, 
    new HtmlWebpackPlugin({
        title: 'Webpack Playground',
        template: './src/index.html'
    })
];

module.exports = webpackCommon;