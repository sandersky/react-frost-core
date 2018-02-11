module.exports = {
  extends: 'lintly',
  globals: {
    HTMLLIElement: false,
  },
  overrides: [
    {
      files: ['plugins/*.js', 'webpack.*.js'],
      rules: {
        'flowtype/require-parameter-type': [0],
        'flowtype/require-return-type': [0],
      },
    },
  ],
}
