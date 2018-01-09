const {join} = require('path')

const {NODE_ENV} = process.env
const TRANSLATIONS_DIRECTORY = join(__dirname, "src", "translations")

function getPlugins() {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ]

  // Omit CSS modules in the test environment as Jest doesn't know how to handle
  // them and they provide no value to Jest tests anyways.
  if (NODE_ENV !== 'test') {
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

  return plugins
}

module.exports = {
  plugins: getPlugins(),
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'ie 10',
          ],
        },
      },
    ],
    '@babel/flow',
    '@babel/react',
  ],
}
