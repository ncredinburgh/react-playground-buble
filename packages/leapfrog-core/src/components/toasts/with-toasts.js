// @flow

import React from 'react'

type WithToastType = {
  delay: number,
  children: () => React.Element<*>,
}

export default class WithToasts extends React.Component {
  props: WithToastType
  static defaultProps = {
    delay: 3000,
  }

  state: {
    toasts: [],
  }

  toasts = {}
  id = 0

  componentWillUnmount() {
    Object.values(this.toasts)
      .forEach(({ timeout }) => clearTimeout(timeout))
  }

  getToasts = () => Object
    .keys(this.toasts)
    .map(v => v * 1)
    .sort()
    .reverse()
    .map(key => ({
      ...this.toasts[key].toast,
      id: key,
    }))

  removeToast = id => {
    clearTimeout(this.toasts[id] && this.toasts[id].timeout)
    delete this.toasts[id]
    this.setState({ toasts: this.getToasts() })
  }

  pushToast = toast => {
    const { id } = this
    this.toasts[id] = {
      toast,
      id,
      timeout: setTimeout(
        () => this.removeToast(id),
        this.props.delay
      ),
    }
    this.id++
    this.setState({ toasts: this.getToasts() })
  }

  render() {
    const { children } = this.props
    const { pushToast, removeToast } = this
    return children({
      toasts: this.getToasts(),
      pushToast,
      removeToast,
    })
  }
}
