import React from 'react'
import { ThemeProvider } from 'styled-components'
import defaultTheme from '../themes/default-theme'
import EventEmitter from 'events'
export class ThemeEmitter extends EventEmitter {}

export const allThemes = Object.keys(themes).map(key => ({
  key,
  ...themes[key],
}))

export default class ThemeChooserProvider extends React.Component {
  state = {
    theme: this.props.theme || defaultTheme,
  }

  constructor() {
    this.themeEmitter = this.props.ThemeEmitter || new ThemeEmitter()
    this.themeEmitter.on('change', this.onChangeTheme)
  }

  static childContextTypes = {
    themeChooser: React.PropTypes.object({
      theme: React.PropTypes.object,
      themeEmitter: React.PropTypes.func,
    }),
  }

  onChangeTheme = theme => {
    this.setState(
      { theme },
      () => this.forceUpdate()
    )
  }

  getChildContext() {
    return {
      themeChooser: {
        onChangeTheme: this.onChangeTheme,
        theme: this.state.theme,
      },
    }
  }

  render() {
    const { theme } = this.state
    const { children } = this.props
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    )
  }
}
