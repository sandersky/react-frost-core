const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const PUBLIC_PATH = path.join(__dirname, 'public')

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        ASSET_PATH: JSON.stringify('/react-frost-core/'),
        NODE_ENV: `"${process.env.NODE_ENV}"`,
      },
    }),
    new SVGSpritemapPlugin({
      filename: 'frost-pack.svg',
      src: 'src/svgs/**/*.svg',
    }),
    new ExtractTextPlugin('styles.css'),
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

function getResolver() {
  const resolver = {
    alias: {},
  }

  if (process.env.INFERNO) {
    Object.assign(resolver.alias, {
      react: 'inferno-compat',
      'react-dom': 'inferno-compat',
    })
  } else if (process.env.PREACT) {
    Object.assign(resolver.alias, {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    })
  }

  return resolver
}

module.exports = {
  devServer: {
    contentBase: PUBLIC_PATH,
    historyApiFallback: true,
    https: true,
  },
  devtool: IS_PRODUCTION ? 'eval' : 'source-map',
  entry: path.resolve('app', 'index.js'),
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
  resolve: getResolver(),
}
