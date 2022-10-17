const { merge } = require('webpack-merge')
const { ModuleFederationPlugin } = require('webpack').container
const { dependencies: deps } = require('../package.json')
const commonConfig = require('./webpack.common')

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp' : './src/bootstrap'
            },
            shared: deps
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)