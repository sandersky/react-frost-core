#! /usr/bin/env node

const {readFileSync, writeFileSync} = require('fs')
const {execSync} = require('child_process')
const {join} = require('path')

// Start fresh
execSync(
  'rm -rf preact/dist preact/CHANGELOG.md preact/LICENSE.md preact/package.json',
)

// Copy files we need for preact npm package
execSync('cp CHANGELOG.md LICENSE.md package.json preact')

const packageJSONPath = join(__dirname, '..', 'preact', 'package.json')

// Make package.json reflect correct package
const contents = readFileSync(packageJSONPath)
const data = JSON.parse(contents)

data.dependencies = {
  preact: '^8.0.0',
}
delete data.devDependencies
data.name = 'preact-frost-core'
delete data.jest
data.main = 'dist/preact-frost-core.min.js'
delete data.scripts
data.style = 'dist/preact-frost-core.min.css'

writeFileSync(packageJSONPath, JSON.stringify(data, null, 2))

execSync('yarn run build-dist-preact')
