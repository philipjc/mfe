const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig,{
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/', // forward slash is important
  },
  devServer: {
    port: 8082,
    // historyApiFallback: {
    //   index: 'index.html',
    // },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap.js',
      },
      shared: packageJson.dependencies
    })
  ]
});
