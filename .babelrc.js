const {join} = require('path')

const {NODE_ENV} = process.env
const TRANSLATIONS_DIRECTORY = join(__dirname, "src", "translations")

function getPlugins() {
  const plugins = []

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
      'babel-preset-nodely',
      {
        env: 'web',
      },
    ],
  ],
}
