import {
  ReactPlaygroundLite,
} from '@di/react-playground-lite'
import React from 'react'
import ThemeChooserProvider from '../../../src/components/theme-chooser-provider'

let _themeBroadcast

export const initThemedPlayground = themeBroadcast => {
  _themeBroadcast = themeBroadcast
}

const ThemedPlayground = ({
  wrapOutput = x => x,
  ...props,
}) => (
  <ReactPlaygroundLite
    borderRadius={0}
    gutter={8}
    {...props}
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
