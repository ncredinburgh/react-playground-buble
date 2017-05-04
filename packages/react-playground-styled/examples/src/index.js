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
  // setTimeout(() => {
  //   document.body.scrollTop = scrollTop
  //   console.log(document.body.scrollTop)
  // }, 5000)
}

if (module.hot) {
  module.hot.accept('./components/app', () => {
    // const App2 = require('./components/app').default
    System.import('./components/app').then(({ default: App2 }) => {
      unmountComponentAtNode(document.getElementById('root'))
      rerender(App2)
      // if (window._playgroundForceUpdateCallbacks) {
      //   console.log(window._playgroundForceUpdateCallbacks)
      //   window._playgroundForceUpdateCallbacks.forEach(fn => fn())
      // }
    })
  })
}

rerender(App)
