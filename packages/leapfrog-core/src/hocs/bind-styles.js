import React from 'react'
import { StyleSheet } from 'aphrodite'
import {
  toClass,
} from 'recompose'

const memo = ({
  shouldStylesUpdate = () => true,
  getStyles,
}) => {
  let lastProps
  let lastStyles
  return (props, mounted) => {
    if (!lastStyles) {
      lastStyles = StyleSheet.create(getStyles(props))
    } else if (
      props.dynamic &&
      shouldStylesUpdate(props, lastProps)
    ) {
      lastStyles = StyleSheet.create(getStyles(props))
    }
    lastProps = props
    return lastStyles
  }
}

const bindStyles = styleFuncs => component => {
  let styleFunc
  styleFunc = memo(styleFuncs)
  const enhance = Component => class extends toClass(Component) {
    componentWillMount() {
      this.styleFunc = memo(styleFuncs)
    }
    render() {
      const { props } = this
      return(
        <Component {...{
          ...props,
          styles: this.styleFunc(props)
        }} />
      )
    }
  }

  return enhance(component)
}

export default bindStyles
