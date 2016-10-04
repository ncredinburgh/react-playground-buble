'use strict' // eslint-disable-line strict
const express = require('express')
const compression = require('compression')
const app = express()
const server = require('http').createServer(app)
const fs = require('fs')
const path = require('path')

const port = process.env.npm_package_config_port || 3000
const packageName = process.env.npm_package_config_package
const webRoot = packageName ?
  `./packages/${packageName}` :
  '.'

if (packageName) {
  const webpack = require('webpack')
  const configPath = path.resolve(webRoot, 'webpack.config.js')
  let config
  try {
    fs.accessSync(configPath)
    console.log('found local webpack.config.js')
    config = require(webRoot + '/webpack.config')({ dev: true })
  } catch (e) {
    console.log('fallback to root webpack.config.js')
    config = require('./webpack.config')({ dev: true })
  }
  const compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}

app.use(compression({
  threshold: 512,
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', express.static(webRoot))

server.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
    return
  }
  console.log(`Listening at http://localhost:${port}`) // eslint-disable-line no-console
})
