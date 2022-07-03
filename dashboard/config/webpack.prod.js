const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig,{
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/dashboard/latest/' // adds the extra cloud-front dir to path.
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
