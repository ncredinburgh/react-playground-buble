'use strict' // eslint-disable-line strict
const express = require('express')
const compression = require('compression')
const app = express()
const server = require('http').createServer(app)
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const { transform } = require('buble')
const stream = require('stream')


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

function forwards(req, res, next) {
  const examples = /^\/examples\/.+$/
  if (examples.test(req.url)) {
    req.url = '/examples/'
  }
  next('route')
}

app.all('*', forwards)

app.use(compression({
  threshold: 512,
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/form', (req, res) => {
  res.header('Content-Type', 'text/csv')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Disposition', 'attachment; filename=out.csv')
  setTimeout(
    () => {
      res.send('hello')
    },
    5000
  )
})

app.post('/form2', (req, res) => {
  res.header('Content-Type', 'text/csv')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Disposition', 'attachment; filename=out.csv')
//  const s = new stream.Readable()
//  s._read = function noop() {}
//  res.write('')
//  s.on('data', (data) => {
//    res.write(data)
//  })
//  s.on('end', () => {
//    res.end()
//  })
  setTimeout(
    () => {
      //s.push('hello')
      //s.push(null)
      res.write('hello')
      res.end()
    },
    5000
  )
})

app.post('/eval', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let transpiled = ''
  let errorMessage = ''
  try {
    const trans = transform(req.body.source, {
      objectAssign: 'Object.assign',
      transforms: {
        dangerousTaggedTemplateString: true,
      },
    })
    transpiled = trans.code
  } catch (e) {
    errorMessage = e.message
  }

  res.send(JSON.stringify({
    transpiled,
    errorMessage,
  }))
})

app.use('/', express.static(webRoot))

server.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
    return
  }
  console.log(`Listening at http://localhost:${port}`) // eslint-disable-line no-console
})
