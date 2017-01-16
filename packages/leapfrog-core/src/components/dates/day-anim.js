import React from 'react'
import styled from 'styled-components'
import DaySvg from './day-svg'

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
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
      disabled: { color: '#666666', fill: 'none', showCircle: false },
      selectStart: { color: hovered ? '#fff' : '#333', fill: start, showCircle: hovered },
      selectEnd: { color: hovered ? '#fff' : '#333', fill: stop, showCircle: hovered },
      range: { color: '#333', fill: range, showCircle: true },
      rangeSelectStart: { color: hovered ? '#fff' : '#333', fill: hovered ? start : range, showCircle: true },
      stopSelectStart: { color: '#fff', fill: hovered ? start : stop, showCircle: true },
    }
    return states[this.props.type || 'selectStart']
  }


  setHovered = value => () => {
    this.setState({ hovered: value })
  }

  render() {
    const { hovered } = this.state
    const {
      color,
      fill,
      showCircle,
    } = this.getColors()
    const { setHovered } = this
    const { children } = this.props
    return (
      <Wrapper
        onMouseEnter={setHovered(true)}
        onMouseLeave={setHovered(false)}
      >
        <DaySvg
          showCircle={showCircle}
          fill={fill}
          color={color}
        >
          {children}
        </DaySvg>
      </Wrapper>
    )
  }

}
