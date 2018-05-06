const {join} = require('path')

const {INFERNO, NODE_ENV, PREACT} = process.env
const TRANSLATIONS_DIRECTORY = join(__dirname, "src", "translations")

function getPlugins() {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ]

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

  return presets
}

module.exports = {
  plugins: getPlugins(),
  presets: getPresets(),
}
