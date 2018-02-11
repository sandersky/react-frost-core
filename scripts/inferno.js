#! /usr/bin/env node

const {readFileSync, writeFileSync} = require('fs')
const {execSync} = require('child_process')
const {join} = require('path')

// Start fresh
execSync('rm -rf inferno')
execSync('mkdir inferno')

// Copy files we need for inferno npm package
execSync('cp CHANGELOG.md LICENSE.md package.json inferno')

const packageJSONPath = join(__dirname, '..', 'inferno', 'package.json')

// Make package.json reflect correct package
const contents = readFileSync(packageJSONPath)
const data = JSON.parse(contents)

data.dependencies = {
  inferno: '^3.0.0',
  'inferno-component': '^3.0.0',
}
delete data.devDependencies
data.name = 'inferno-frost-core'
delete data.jest
data.main = 'dist/inferno-frost-core.min.js'
delete data.scripts
data.style = 'dist/inferno-frost-core.min.css'

writeFileSync(packageJSONPath, JSON.stringify(data, null, 2))

execSync('yarn run build-dist-inferno')
