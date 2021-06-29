const paths = require('../paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const appEntry = [`${paths.src}/index.jsx`]

const output = {
  path: paths.build,
  filename: '[name].bundle.js',
  publicPath: '/'
}

const resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'], // remove ts and tsx if you don't need typescript
  modules: ['node_modules'],
  alias: {
    appConfigs: `${paths.configs}/app`,
    components: `${paths.src}/components`,
    containers: `${paths.src}/containers`,
    reducers: `${paths.src}/reduders`,
    utils: paths.utils
  }
}

const devServer = {
  port: 3000,
  watchContentBase: true,
  historyApiFallback: true // this is for React Router DOM
}

const modules = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.(css|scss|sass)$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }
  ]
}

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css'
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: paths.assets,
        to: 'assets',
        globOptions: {
          ignore: ['*.DS_Store']
        }
      }
    ]
  }),
  new HTMLWebpackPlugin({
    title: 'Title of the Application',
    favicon: `${paths.assets}/icons/favicon.png`,
    template: `${paths.public}/index.html`,
    filename: 'index.html'
  })
]

module.exports = {
  entry: appEntry,
  output,
  resolve,
  devServer,
  module: modules,
  plugins
}
