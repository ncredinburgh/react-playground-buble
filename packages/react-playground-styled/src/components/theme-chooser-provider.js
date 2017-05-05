import React from 'react'
import { ThemeProvider } from 'styled-components'

export default class ThemeChooserProvider extends React.Component {
  state = {
    theme: (this.props.themeBroadcast && this.props.themeBroadcast.theme) ||
    this.props.theme || {},
    themeBroadcast: this.props.themeBroadcast,
  }

  static childContextTypes = {
    themeChooser: React.PropTypes.shape({
      theme: React.PropTypes.object,
      onChangeTheme: React.PropTypes.func,
      themeBroadcast: React.PropTypes.object,
    }),
  }

  onChangeTheme = (theme, cancelBroadcast) => {
    const { themeBroadcast } = this.props
    this.setState({ theme }, () => this.forceUpdate())
    if (!themeBroadcast || cancelBroadcast) return
    themeBroadcast.broadcast(theme, this.onChangeTheme)
  }

  // getChildContext() {
  //   return { onChangeTheme: this.onChangeTheme }
  // }

  getChildContext() {
    return {
      themeChooser: {
        onChangeTheme: this.onChangeTheme,
        theme: this.state.theme,
      },
    }
  }

  componentWillMount() {
    const { themeBroadcast } = this.props
    if (!themeBroadcast) return
    themeBroadcast.addListener(this.onChangeTheme)
  }

  componentWillUnmount() {
    const { themeBroadcast } = this.props
    if (!themeBroadcast) return
    themeBroadcast.removeListener(this.onChangeTheme)
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
