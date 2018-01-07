const {join} = require('path')

const TRANSLATIONS_DIRECTORY = join(__dirname, "src", "translations")

module.exports = {
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "babel-plugin-auto-css-modules",
    "./plugins/babel-plugin-auto-generate-typography",
    [
      "./plugins/babel-plugin-grammatic",
      {
        "translationsDirectory": TRANSLATIONS_DIRECTORY,
      },
    ],
    "./plugins/babel-plugin-react-code-block",
  ],
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "browsers": [
            "last 2 versions",
            "ie 10",
          ],
        },
      },
    ],
    "@babel/flow",
    "@babel/react",
  ],
}
