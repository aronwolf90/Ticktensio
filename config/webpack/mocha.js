const environment = require('./environment')

module.exports = environment.toWebpackConfig()

module.exports.devtool = 'inline-cheap-module-source-map'

module.exports.watchOptions = {
  poll: 1000
}
