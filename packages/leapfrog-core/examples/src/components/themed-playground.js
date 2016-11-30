import {
  ReactPlaygroundStyled,
} from '@di/react-playground-styled'
import React from 'react'
import ThemeChooserProvider from '../../../src/components/theme-chooser-provider'

let _themeBroadcast

export const initThemedPlayground = themeBroadcast => {
  _themeBroadcast = themeBroadcast
}

const EvalWrapper = ({ children }) => (
  <ThemeChooserProvider
    themeBroadcast={_themeBroadcast}
  >
    {children}
  </ThemeChooserProvider>
)

const ThemedPlayground = ({
  wrapOutput = x => x,
  ...props,
}) => (
  <ReactPlaygroundStyled
    borderRadius={0}
    gutter={8}
    {...props}
    EvalWrapper={EvalWrapper}
    wrapOutput={children => (
      <ThemeChooserProvider
        themeBroadcast={_themeBroadcast}
      >
        {wrapOutput(children)}
      </ThemeChooserProvider>
    )}
  />
)

export default ThemedPlayground
