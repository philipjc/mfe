const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig,{
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/', // forward slash is important
  },
  devServer: {
    port: 8083,
    // historyApiFallback: {
    //   index: 'index.html',
    // }
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }, // for loading to fonts etc and not get CORS errors.
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap.js',
      },
      shared: packageJson.dependencies
    })
  ]
});
