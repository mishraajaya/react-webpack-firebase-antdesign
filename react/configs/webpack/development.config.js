const paths = require('../paths')
const { mergeWithCustomize } = require('webpack-merge')
const baseConfig = require('./base.config')

const mode = 'development'

const devTool= 'inline-source-map'

const devServer = {
  compress: true,
  contentBase: paths.build,
  historyApiFallback: true,
  hot: true,
  open: false,
  port: 3000
}

const _module = {
  rules: [
    {
      enforce: 'pre',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        cache: true,
        quiet: true
      }
    }
  ]
}

module.exports = mergeWithCustomize({ 'module.rules': 'prepend '})(baseConfig, {
  mode,
  devtool: devTool,
  devServer,
  module: _module
})