import { getContext } from 'recompose'
import React from 'react'

export default Component => class WithTheme extends React.Component {
  static contextTypes ={
    themeChooser: React.PropTypes.shape({
      theme: React.PropTypes.object,
      onChangeTheme: React.PropTypes.func,
    })
  }

  render() {
    const theme = this.context &&
      this.context.themeChooser &&
      this.context.themeChooser.theme
    return <Component {...this.props} theme={theme} />
  }
}

const enhance = getContext({
  themeChooser: React.PropTypes.shape({
    theme: React.PropTypes.object,
    onChangeTheme: React.PropTypes.func,
  }),
})
