const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].css?[contenthash:8]',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = function (env) {
  return {
    entry: {
      bundle: './src/js/index.js',
      styles: './src/styles/main.scss'
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      publicPath: '',
      filename: 'js/[name].js?[chunkhash:8]'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader'
        }, {
          test: /[.]html$/,
          loader: 'html-loader?' + JSON.stringify({ pretty: true })
        }, {
          test: /\.scss$/,
          use: extractSass.extract({
            use: ['css-loader', 'sass-loader?sourceMap'],
            fallback: 'style-loader',
            publicPath: '../'
          })
        }, {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff' +
            '&hash=sha512&digest=hex&name=fonts/[name].[ext]?[hash:8]'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?hash=sha512&digest=hex&name=fonts/[name].[ext]?[hash:8]'
        }, {
          test: /\.(jpe?g|png|gif|svg|ico)$/,
          loaders: [
            'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]?[hash:8]'
          ]
        }
      ]
    },
    plugins: [
      extractSass,
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ]
  }
}
