const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const domain = process.env.PRODUCTION_DOMAIN || 'no_prod_domain_found';

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // this is a big assumption that these files will reside in the sub dirs in S3.
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ]
});
