'use strict' // eslint-disable-line strict
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')({ dev: true })
const compression = require('compression')
const app = express()
const server = require('http').createServer(app)
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const fs = require('fs')
const path = require('path')
//const url = require('url')
const bodyParser = require('body-parser')
// const requestProxy = require('express-request-proxy')
// const io = require('socket.io')(server)

const compiler = webpack(config)
//const dashboard = new Dashboard()
//compiler.apply(new DashboardPlugin(dashboard.setData))
const port = 3001

app.use(require('webpack-dev-middleware')(compiler, {
//  noInfo: true,
  publicPath: config.output.publicPath,
//  quiet: true,
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}))

app.use(compression({
  threshold: 512,
}))

app.use(bodyParser.text())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})



// app.post('/greeting', (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.send(JSON.stringify({
//     greeting: `greetings ${req.body.name} from dev server`,
//   }))
// })

app.get('/greeting', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({
    greeting: 'greetings from dev server',
  }))
})

app.use('/', express.static('./packages/ooo-docs'))

// app.all('*', (req, res, next) => {
//   const url = require('url').parse(req.url)
//   const conf = objectAssign({}, req, {
//     url: 'http://127.0.0.1:8888' + url.pathname,
//     timeout: 120000
//   })
//   requestProxy(conf)(req, res, next)
// })

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

server.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
    return
  }
  console.log(`Listening at http://localhost:${port}`) // eslint-disable-line no-console
})

// io.on('connection', socket => {
//   io.set('origins', '*:*')
//   console.log('connected') // eslint-disable-line no-console
//   socket.emit('update', 'connected')
//   socket.on('single', () => {
//     socket.emit('update', 'single')
//   })
//   socket.on('publish', data => {
//     io.sockets.emit('update', data)
//   })
// })
