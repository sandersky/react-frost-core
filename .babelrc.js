const {join} = require('path')

const {LIB_BUILD, NODE_ENV} = process.env
const TRANSLATIONS_DIRECTORY = join(__dirname, "src", "translations")

function getPlugins() {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ]

  // Since lib build doesn't use @babel/react preset we need to include the JSX
  // plugin so Babel understand's the JSX syntax.
  if (LIB_BUILD) {
    plugins.push('@babel/plugin-syntax-jsx')
  }

  // Omit CSS modules in the test environment as Jest doesn't know how to handle
  // them and they provide no value to Jest tests anyways.
  if (!LIB_BUILD && NODE_ENV !== 'test') {
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

function getPresets() {
  if (LIB_BUILD) {
    return ['@babel/flow']
  }

  return [
    [
      '@babel/env',
      {
        targets: LIB_BUILD ? {node: '4'} : {
          browsers: [
            'last 2 versions',
            'ie 10',
          ],
        }
      },
    ],
    '@babel/flow',
    '@babel/react',
  ]
}

module.exports = {
  plugins: getPlugins(),
  presets: getPresets(),
}
