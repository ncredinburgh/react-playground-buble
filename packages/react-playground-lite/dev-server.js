'use strict' // eslint-disable-line strict
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')({ dev: true })
const compression = require('compression')
const app = express()
const server = require('http').createServer(app)

const compiler = webpack(config)
const port = process.env.npm_package_config_port

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(compression({
  threshold: 512,
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', express.static('.'))

server.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
    return
  }
  console.log(`Listening at http://localhost:${port}`) // eslint-disable-line no-console
})
