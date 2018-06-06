const OFF = 'off'
const WARN = 'warn'

module.exports = {
  extends: 'lintly',
  globals: {
    HTMLLIElement: false,
  },
  overrides: [
    {
      excludedFiles: ['**/__mocks__/**/*.js', '**/__tests__/**/*.js'],
      files: ['**/*.js'],
      rules: {
        'flowtype/no-flow-fix-me-comments': [WARN],
      },
    },
    {
      files: ['plugins/*.js', 'webpack.*.js'],
      rules: {
        'flowtype/require-parameter-type': [OFF],
        'flowtype/require-return-type': [OFF],
      },
    },
  ],
  rules: {
    'flowtype/no-flow-fix-me-comments': [WARN]
  },
}
