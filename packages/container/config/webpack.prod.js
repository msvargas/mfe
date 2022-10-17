const { merge } = require('webpack-merge')
const { ModuleFederationPlugin } = require('webpack').container
const { dependencies: deps } = require('../package.json')
const commonConfig = require('./webpack.common')

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
            },
            shared: deps
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig)