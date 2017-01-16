import React from 'react'
import { PageLoader, SmallLoader } from '@di-internal/leapfrog-icons'
import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from { transform: rotate3d(0,0,1,0deg); }
  to { transform: rotate3d(0,0,1,360deg); }`

const rotate = icon => styled(icon)`
  animation: ${rotate360} 1s linear infinite;`

const Page = rotate(PageLoader)
const Small = rotate(SmallLoader)

export default class Loader extends React.Component {
  state = { show: this.props.delay === 0 }

  static defaultProps = {
    delay: 100,
  }

  constructor(props) {
    super(props)
    if (this.state.show) return
    this.clear = setTimeout(
      () => this.setState({ show: true }),
      props.delay
    )
  }

  componentWillUnmount = () => {
    clearTimeout(this.clear)
  }

  render() {
    const { state } = this
    const { small, delay, height = 22, ...props } = this.props
    if (state.show === false) return <div style={{ height: height, width: height }}/>
    return this.props.small ?
      <Small block height={height} {...props} /> :
      <Page block height={height} {...props} />
  }
}
