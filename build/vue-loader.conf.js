var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: {
    plugins: [
      require('postcss-simple-import')({
        cache: false
      }),
      require('lost')(),
      require('postcss-cssnext')()
    ]
  }
}
