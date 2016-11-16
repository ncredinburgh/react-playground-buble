import React from 'react'

export default delay => Component =>
  class WithToast extends React.Component {
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

    onRemoveToast = id => {
      clearTimeout(this.toasts[id] && this.toasts[id].timeout)
      delete this.toasts[id]
      this.setState({ toasts: this.getToasts() })
    }

    onPushToast = toast => {
      const { id } = this
      this.toasts[id] = {
        toast,
        id,
        timeout: setTimeout(
          () => this.onRemoveToast(id),
          delay
        ),
      }
      this.id++
      this.setState({ toasts: this.getToasts() })
    }

    render() {
      const props = {
        ...this.props,
        pushToast: this.onPushToast,
        onRemoveToast: this.onRemoveToast,
        toasts: this.getToasts(),
      }
      return <Component {...props} />
    }
  }
