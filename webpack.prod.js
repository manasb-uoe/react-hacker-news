const webpackDevConfig = require("./webpack.dev");

webpackDevConfig.mode = "production";
webpackDevConfig.devtool = false;
webpackDevConfig.optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        chunks: "all",
      },
    },
  },
};

module.exports = webpackDevConfig;
