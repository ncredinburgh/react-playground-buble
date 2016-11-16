import React from 'react'
import Toast from './toast'
import TransitionGroup from 'react-addons-transition-group'
import SlideDown from '../slide-down'

const Toasts = ({ toasts }) => (
  <TransitionGroup>
    {
      toasts.map(({ id, type, icon, children }) => (
        <SlideDown key={id}>
          <Toast {...{ id, type, icon, children }} />
        </SlideDown>
      ))
    }
  </TransitionGroup>
)

export default Toasts
