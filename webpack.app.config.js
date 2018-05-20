const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const webpack = require('webpack')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const PUBLIC_PATH = path.join(__dirname, 'public')

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        ASSET_PATH: JSON.stringify('/react-frost-core/'),
      },
    }),
    new SVGSpritemapPlugin({
      filename: 'frost-pack.svg',
      src: 'src/svgs/**/*.svg',
    }),
    new ExtractTextPlugin('styles.css'),
  ]

  return plugins
}

module.exports = {
  devServer: {
    contentBase: PUBLIC_PATH,
    historyApiFallback: true,
    https: true,
  },
  devtool: IS_PRODUCTION ? 'eval' : 'source-map',
  entry: path.resolve('app', 'index.js'),
  mode: IS_PRODUCTION ? 'production' : 'development',
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: IS_PRODUCTION,
                sourceMap: true,
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        exclude: [/node_modules/],
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
        ],
        test: /\.(gif|jpe?g|png|svg)$/,
      },
      {
        exclude: [/node_modules/],
        loaders: ['babel-loader'],
        test: /\.js$/,
      },
    ],
  },
  output: {
    path: PUBLIC_PATH,
    publicPath: '/react-frost-core/',
    filename: 'bundle.js',
  },
  plugins: getPlugins(),
}
