import React from 'react'
import styled from 'styled-components'
import DaySvg from './day-canvas'
import shouldPureComponentUpdate from 'react-pure-render/function'

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({disabled}) => disabled ? '#f2f2f2' : 'transparent'};
`

const start = '#2e6f03'
const stop = '#d44403'
const range = '#ccc'
const grayText = '#666666'


export default class DayAnim extends React.Component {
  state = {
    hovered: false,
  }

  getColors = () => {
    const { hovered } = this.state
    const states = {
      start: { color: '#fff', fill: start, showCircle: true },
      stop: { color: '#fff', fill: stop, showCircle: true },
      disabled: { color: '#666666', fill: '#f2f2f2', showCircle: false },
      unselected: { color: '#333', fill: '#fff', showCircle: false },
      range: { color: '#333', fill: range, showCircle: true },
    }
    return states[this.props.type || 'unselected']
  }

  onMouseEnter = () => {
    const { onMouseEnter } = this.props
    this.setState({ hovered: true })
    if (onMouseEnter) onMouseEnter()
  }

  onMouseLeave = () => {
    const { onMouseLeave } = this.props
    this.setState({ hovered: false })
    if (onMouseLeave) onMouseLeave()
  }

  onClick = () => {
    const { onClick, type } = this.props
    if (onClick && type !== 'disabled') onClick()
  }

  shouldComponentUpdate = shouldPureComponentUpdate
  // (nextProps, nextState) {
  //   const { props, state } = this
  //
  //   return props.type !== nextProps.type ||
  //   props.children !== nextProps.children ||
  //   state.hovered !== nextState.hovered
  // }

  render() {
    const { hovered } = this.state
    const {
      color,
      fill,
      showCircle,
    } = this.getColors()
    const { onMouseEnter, onMouseLeave, onClick } = this
    const { children, type, hoopColor } = this.props
    return (
      <Wrapper
        disabled={type === 'disabled'}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <DaySvg
          showCircle={showCircle}
          fill={fill}
          color={color}
          hoopColor={hoopColor}
        >
          {children}
        </DaySvg>
      </Wrapper>
    )
  }

}
