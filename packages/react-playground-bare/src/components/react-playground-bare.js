// @flow

import React from 'react'
import { transform } from 'buble'
import ReactDOM from 'react-dom'

import {
  localCompile,
  remoteCompile,
  evalReact,
  formatErrorMessage,
} from '../util'

type WithPlaygroundType = {
  defaultValue: string,
  scope: object,
  children: () => React.Element<*>,
}

export default class WithPlayground extends React.Component {
  props: WithPlaygroundType
  static defaultProps = {
    delay: 3000,
  }

  state = {
    evalChild: null,
    errorMessage: '',
  }

  onUpdateSource = source => {
    const { scope } = this.props
    remoteCompile(source)
      .then(evalReact(scope))
      .then(this.onComponent)
      .catch(error => this.onError({
        source,
        error,
      }))
  }

  onComponent = evalChild => {
    this.setState({
      evalChild,
      errorMessage: '',
    })
  }

  onError = ({ error, source }) => {
    const errorMessage = error.message
    this.setState({
      errorMessage: formatErrorMessage({ errorMessage, source })
    })
  }

  componentWillMount() {
    this.onUpdateSource(this.props.defaultValue)
  }

  onChange = this.onUpdateSource

  render() {
    const { children, defaultValue } = this.props
    const { errorMessage, evalChild } = this.state
    const { onChange } = this
    return children({
      defaultValue,
      onChange,
      errorMessage,
      evalChild,
    })
  }
}
