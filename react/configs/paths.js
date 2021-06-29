const path = require('path')

module.exports = {
  assets: path.resolve(__dirname, '../../assets'),
  configs: path.resolve(__dirname, '../configs'),
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../dist'),
  public: path.resolve(__dirname, '../../public'),
  utils: path.resolve(__dirname, '../utils')
}
