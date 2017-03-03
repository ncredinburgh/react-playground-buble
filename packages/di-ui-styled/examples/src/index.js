import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import App from './app'
import { AppContainer } from 'react-hot-loader'
import {
  forceViewerUpdate,
} from '@di-internal/react-playground-lite'
import { diTheme } from '../../src/themes'
import { ThemeBroadcast } from '../../src'
import { initThemedPlayground } from './components/themed-playground'
import FastClick from 'fastclick'
export const themeBroadcast = new ThemeBroadcast(diTheme)
initThemedPlayground(themeBroadcast)

window.addEventListener('load', () => {
  FastClick.attach(document.body)
})

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
  module.hot.accept(['./app', '../../src'], () => {
    console.log('change')
//    const App2 = require('./app').default
    System.import('./app').then(({ default: App2 }) => {
      unmountComponentAtNode(document.getElementById('root'))
      rerender(App2)
      //forceViewerUpdate()
    })
  })
}

rerender(App)
