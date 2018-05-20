const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')

const {NODE_ENV} = process.env
const DIST_PATH = path.join(__dirname, 'dist')
const IS_PRODUCTION = NODE_ENV === 'production'

const CSS_FILE_NAME = IS_PRODUCTION
  ? `react-frost-core.min.css`
  : `react-frost-core.css`

const JS_FILE_NAME = IS_PRODUCTION
  ? `react-frost-core.min.js`
  : `react-frost-core.js`

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
  externals: ['grammatic', 'react', 'react-dom'],
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
    path: DIST_PATH,
    filename: JS_FILE_NAME,
    library: `reactFrostCore`,
    libraryTarget: 'umd',
  },
  plugins: getPlugins(),
}
