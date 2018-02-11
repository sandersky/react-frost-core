const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const {INFERNO, NODE_ENV, PREACT} = process.env
const IS_PRODUCTION = NODE_ENV === 'production'

let PREFIX
let DIST_PATH

if (INFERNO) {
  DIST_PATH = path.join(__dirname, 'inferno', 'dist')
  PREFIX = 'inferno'
} else if (PREACT) {
  DIST_PATH = path.join(__dirname, 'preact', 'dist')
  PREFIX = 'preact'
} else {
  DIST_PATH = path.join(__dirname, 'dist')
  PREFIX = 'react'
}

const CSS_FILE_NAME = IS_PRODUCTION
  ? `${PREFIX}-frost-core.min.css`
  : `${PREFIX}-frost-core.css`

const JS_FILE_NAME = IS_PRODUCTION
  ? `${PREFIX}-frost-core.min.js`
  : `${PREFIX}-frost-core.js`

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${NODE_ENV}"`,
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
  externals: [
    'grammatic',
    'inferno',
    'inferno-component',
    'preact',
    'react',
    'react-dom',
  ],
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
    library: `${PREFIX}FrostCore`,
    libraryTarget: 'umd',
  },
  plugins: getPlugins(),
}
