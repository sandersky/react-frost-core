const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
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
    new SVGSpritemapPlugin({
      filename: 'frost-pack.svg',
      src: 'src/svgs/**/*.svg',
    }),
    new ExtractTextPlugin(CSS_FILE_NAME),
  ]

  return plugins
}

module.exports = {
  devtool: IS_PRODUCTION ? 'eval' : 'source-map',
  entry: path.resolve('src', 'index.js'),
  externals: [
    'grammatic',
    'inferno',
    'inferno-clone-vnode',
    'inferno-compat',
    'inferno-component',
    'inferno-create-class',
    'inferno-create-element',
    'preact',
    'react',
    'react-dom',
  ],
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
        loaders: ['babel-loader'/*, 'linaria/loader'*/],
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
