import React from 'react'

export default class SlideDown extends React.Component {
  state = {
    phase: 'init'
  }
  componentWillEnter(callback) {
    const rect = this.el.getBoundingClientRect()
    this.setState({
      phase: 'hide',
      height: rect.height,
    })
    setTimeout(() => this.setState({ phase: 'enter' }), 10)
    setTimeout(callback, 500)
  }

  componentWillLeave(callback) {
    this.setState({
      phase: 'leave',
      height: 0,
    })
    setTimeout(callback, 500)
  }

  render() {
    const { children } = this.props
    return (
      <div
        ref={el => { if (el) this.el = el }}
        style={styleWrapper(this.state)}
      >
        {children}
      </div>
    )
  }
}

const styleWrapper = ({ height, phase }) => {
  const styles = {
    init: {
      position: 'relative',
      overflow: 'hidden',
      transition: 'all .3s',
    },
    hide: {
      height: 0,
    },
    enter: {
      height,
    },
    leave: {
      height: 0,
    },
  }

  return {
    ...styles.init,
    ...(styles[phase] || {}),
  }
}
