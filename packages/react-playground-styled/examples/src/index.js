import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import App from './components/app'
import { AppContainer } from 'react-hot-loader'

// let scrollTop = document.body.scrollTop

function rerender(App2) {
  render(
    <AppContainer>
      <App2 />
    </AppContainer>,
    document.getElementById('root')
  )
  //  setTimeout(() => {
  //    document.body.scrollTop = scrollTop
  //  }, 50)
}

if (module.hot) {
  module.hot.accept('./components/app', () => {
    // const App2 = require('./components/app').default
    System.import('./components/app').then(({ default: App2 }) => {
      //    scrollTop = document.body.scrollTop
      unmountComponentAtNode(document.getElementById('root'))
      rerender(App2)
    })
  })
}

rerender(App)
