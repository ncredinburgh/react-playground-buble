import React from 'react'
import ThemedPortal from './themed-portal'
import styled from 'styled-components'
import TransitionGroup from 'react-addons-transition-group'
import { Close } from '@di/leapfrog-icons'

const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  opacity: ${({ phase }) => phase === 'enter' ? 1 : 0}
  transition: opacity .4s;
  position: fixed;
  box-sizing: border-box;
  overflow: auto;
  top: 0;
  ${({ zIndex }) => zIndex === undefined ? '' : `z-index: ${zIndex};`}
`

const Content = styled.div`
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  position: relative;
  transform: translate3d(0,${({ phase }) => phase === 'enter' ? 0 : '-50vh'},0);
  transition: transform .4s;

  @media (min-width: 768px) {
    margin: 10px auto;
    width: 600px;
  }

  @media (min-width: 992px) {
    margin: 30px auto;
    width: 900px;
    padding: 30px;
  }
  `

const CloseIcon = styled(Close)`
  color: #666;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 15px;
  &:hover {
    color: #333;
  }
`

class Modal extends React.Component {
  state = {
    phase: 'init'
  }

  timeouts = []

  componentWillEnter(callback) {
    this.setState({ phase: 'hide' })
    this.timeouts.push(setTimeout(() => this.setState({ phase: 'enter' }), 10))
    this.timeouts.push(setTimeout(callback, 500))
  }

  componentWillLeave(callback) {
    this.setState({ phase: 'leave' })
    this.timeouts.push(setTimeout(callback, 500))
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
  }

  render() {
    const { onCancel, zIndex, children } = this.props
    const { phase } = this.state
    return (
      <ThemedPortal>
        <FullScreen zIndex={zIndex} onClick={onCancel} phase={phase}>
          <Content onClick={e => e.stopPropagation()} phase={phase}>
            {onCancel ? <CloseIcon onClick={onCancel} /> : null}
            {children}
          </Content>
        </FullScreen>
      </ThemedPortal>
    )
  }
}

export default ({ show, ...props }) => (
  <TransitionGroup>
    {show ? <Modal {...props} /> : null}
  </TransitionGroup>
)
