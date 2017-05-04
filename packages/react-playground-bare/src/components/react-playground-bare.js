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

type ReactPlaygroundBareType = {
  defaultValue: string,
  scope: { [key: string]: any },
  remoteEvalUrl?: string,
  useRemoteEval?: boolean | (() => boolean),
  children: () => React.Element<*>,
}

export default class ReactPlaygroundBare extends React.Component {
  props: ReactPlaygroundBareType
  static defaultProps = {
    useRemoteEval: /MSIE [6-9]/.test(navigator.userAgent),
    remoteEvalUrl: '/eval',
  }

  state = {
    evalChild: null,
    errorMessage: '',
  }

  onUpdateSource = source => {
    const { scope, EvalWrapper, useRemoteEval, remoteEvalUrl } = this.props
    const { mountNode } = this
    const useRemote = typeof useRemoteEval === 'function'
      ? useRemoteEval()
      : useRemoteEval
    const compile = useRemote ? remoteCompile : localCompile
    compile(source, remoteEvalUrl)
      .then(evalReact(scope, mountNode, EvalWrapper))
      .then(this.onComponent)
      .catch(error =>
        this.onError({
          source,
          error,
        })
      )
  }

  onComponent = evalChild => {
    const { EvalWrapper } = this.props
    const { mountNode } = this
    if (evalChild) {
      ReactDOM.unmountComponentAtNode(mountNode)
      ReactDOM.render(
        EvalWrapper
          ? <EvalWrapper>
              {evalChild}
            </EvalWrapper>
          : evalChild,
        mountNode
      )
    }

    if (this.mounted === false) return
    this.setState({
      evalChild,
      errorMessage: '',
    })
  }

  onError = ({ error, source }) => {
    const errorMessage = error.message
    if (this.mounted === false) return
    this.setState({
      errorMessage: formatErrorMessage({ errorMessage, source }),
    })
  }

  componentWillMount() {
    this.mounted = true
    this.onUpdateSource(this.props.defaultValue)
  }

  componentWillUnmount() {
    this.mounted = false
    ReactDOM.unmountComponentAtNode(this.mountNode)
  }

  onViewerMount = el => {
    if (!(el instanceof Node)) return
    this.mountNode = el
    this.onUpdateSource(this.props.defaultValue)
  }

  onChange = this.onUpdateSource

  render() {
    const { children, defaultValue } = this.props
    const { errorMessage, evalChild } = this.state
    const { onChange, onViewerMount } = this
    return children({
      defaultValue,
      onChange,
      errorMessage,
      evalChild,
      onViewerMount,
    })
  }
}
