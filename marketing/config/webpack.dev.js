const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig,{
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8081/', // forward slash is important
  },
  devServer: {
    port: 8081,
    // historyApiFallback: {
    //   index: 'index.html',
    // }
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap.js',
      },
      shared: packageJson.dependencies
    })
  ]
});
