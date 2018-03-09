const {join} = require('path')

const {INFERNO, NODE_ENV, PREACT} = process.env
const IS_PRODUCTION = NODE_ENV === 'production'
const IS_TEST = NODE_ENV === 'test'
const TRANSLATIONS_DIRECTORY = join(__dirname, "src", "translations")

const CSS_FILENAME = IS_PRODUCTION
  ? 'react-frost-core2.min.css'
  : 'react-frost-core2.css'

function getPlugins() {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'object-styles-to-template',
  ]

  // Omit CSS modules in the test environment as Jest doesn't know how to handle
  // them and they provide no value to Jest tests anyways.
  if (!IS_TEST) {
    plugins.push('babel-plugin-auto-css-modules')
  }

  plugins.push(
    './plugins/babel-plugin-auto-generate-typography',
    [
      './plugins/babel-plugin-grammatic',
      {
        translationsDirectory: TRANSLATIONS_DIRECTORY,
      },
    ],
    [
      'babel-plugin-react-code-block',
      {
        component: 'CodeBlock',
      },
    ],
  )

  if (INFERNO) {
    plugins.push(
      join(__dirname, 'plugins', 'babel-plugin-react-to-inferno'),
      'babel-plugin-inferno',
    )
  } else if (PREACT) {
    plugins.push(
      [
        '@babel/transform-react-jsx',
        {
          pragma: 'h',
        },
      ],
      'transform-preact-import',
      [
        'transform-rename-import',
        {
          original: '^react(-dom)?$',
          replacement: 'preact',
        },
      ],
    )
  }

  return plugins
}

function getPresets() {
  const presets = [
    [
      '@babel/env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'ie 10',
          ],
        }
      },
    ],
    '@babel/flow',
  ]

  if (!INFERNO && !PREACT) {
    presets.push('@babel/react')
  }

  if (!IS_TEST) {
    presets.push([
      'linaria/babel',
      {
        filename: CSS_FILENAME,
        outDir: 'dist',
        single: true,
      },
    ])
  }

  return presets
}

module.exports = {
  plugins: getPlugins(),
  presets: getPresets(),
}
