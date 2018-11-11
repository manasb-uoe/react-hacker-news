const CleanWebpackPlugin = require('clean-webpack-plugin'); 

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [['@babel/preset-env', {'useBuiltIns': 'usage'}], '@babel/preset-react'],
                    plugins: [
                        ['@babel/plugin-proposal-decorators', {legacy: true}]
                    ]
                  }
                }
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
}