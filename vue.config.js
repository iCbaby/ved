const webpack = require('webpack')

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './', // 打包环境
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  chainWebpack (config) {
    // set resolve alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@c', resolve('src/components'))
      .set('@s', resolve('src/styles'))
      .set('@u', resolve('src/utils'))
      .set('@v', resolve('src/views'))
      .end()

    // set resolve extensions
    config.resolve.extensions
      .merge(['.js', '.vue', '.jsx', '.json', 'css', '.scss', '.sass', '.styl'])
      .end()
  }
}
