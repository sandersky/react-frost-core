const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const CSS_FILE_NAME = IS_PRODUCTION
  ? 'react-frost-core.min.css'
  : 'react-frost-core.css'

const JS_FILE_NAME = IS_PRODUCTION
  ? 'react-frost-core.min.js'
  : 'react-frost-core.js'

const DIST_PATH = path.join(__dirname, 'dist')

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
      },
    }),
    new SVGSpritemapPlugin({
      filename: 'frost-pack.svg',
      src: 'src/svgs/**/*.svg',
    }),
    new ExtractTextPlugin(CSS_FILE_NAME),
  ]

  if (IS_PRODUCTION) {
    plugins.push(
      new UglifyJSPlugin({
        extractComments: true,
        sourceMap: true,
      }),
    )
  }

  return plugins
}

module.exports = {
  devtool: 'source-map',
  entry: path.resolve('src', 'index.js'),
  externals: ['grammatic', 'react', 'react-dom'],
  module: {
    loaders: [
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
    path: DIST_PATH,
    filename: JS_FILE_NAME,
    library: 'reactFrostCore',
    libraryTarget: 'umd',
  },
  plugins: getPlugins(),
}
