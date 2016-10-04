import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import App from './app'
import { AppContainer } from 'react-hot-loader'

function rerender(App2) {
  render(
    <AppContainer>
      <App2 />
    </AppContainer>
    ,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./app', () => {
//    const App2 = require('./components/app').default
    System.import('./app').then(({ default: App2 }) => {
      //unmountComponentAtNode(document.getElementById('root'))
      rerender(App2)
    })
  })
}

console.log('hello')

rerender(App)
