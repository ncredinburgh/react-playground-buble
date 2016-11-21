import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { getContext } from 'recompose'

class ThemedPortal extends React.Component {
  portalRender = props => {
    const { themeChooser, children } = props
    const theme = (themeChooser && themeChooser.theme) || {}
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    , this.el)
  }

  componentWillMount() {
    this.el = document.createElement('div')
    document.body.appendChild(this.el)
    this.portalRender(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.portalRender(nextProps)
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.el)
    document.body.removeChild(this.el)
  }

  render() {
    return null
  }
}

const enhance = getContext({
  themeChooser: React.PropTypes.shape({
    theme: React.PropTypes.object,
    onChangeTheme: React.PropTypes.func
  }),
})

export default enhance(ThemedPortal)
