/* global module, process */
let path = require('path')
let webpack = require('webpack')

let uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false },
})

module.exports = [
  configForEnvironment('development'),
  configForEnvironment('production', '.min', [uglifyPlugin]),
]

function configForEnvironment(env, suffix = '', extraPlugins = []) {
  return {
    entry: path.join(process.cwd(), 'src', 'index.js'),
    output: {
      path: './lib',
      filename: `react-remote-data-umd${suffix}.js`,
      libraryTarget: 'umd',
      library: 'ReactRemoteData',
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
    ].concat(extraPlugins),
  }
}
