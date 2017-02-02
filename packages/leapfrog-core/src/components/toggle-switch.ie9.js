import React from 'react'
import styled from 'styled-components'
import { firstDefined } from '@di-internal/leapfrog-util'

import {
  fromCss,
  lighten,
  darken,
  toCss,
  luminance
} from 'color-array'

const Outer = styled.div`
  opacity: ${({ disabled }) => disabled ? 0.4 : 1};
  border-radius: 2px;
  width: ${({ small }) => small ? 85 : 95}px;
  height: ${({ small }) => small ? 35 : 42}px;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  background-color: ${({ value, theme: {
    sectionCColor } }) => value ? sectionCColor : '#ededed'};
  &:hover {
    background-color: ${({ value, theme: {
      sectionCColor } }) => value ? toCss(lighten(fromCss(sectionCColor), 0.10)) : '#e2e2e2'};
  }
  color: ${({ value }) => value ? '#ededed' : '#666'};
  transition: background .2s;
  border: 0px solid #ccc;
  display: inline-block;
  text-align: left;
  box-shadow: 2px 2px 1px rgba(0,0,0,0.15) inset;
  cursor: default;`

const InnerBox = styled.div`
  border-radius: 2px;
  box-shadow: 2px 2px 1px rgba(0,0,0,0.15);
  background-color: #fff;
  transition: all .2s;
  ${
    ({ small }) => small ?
    `width: 35px;
    height: 22px;` :
    `width: 45px;
    height: 30px;`
  }
  position: relative;
  display: block;`

const InnerWrapper = styled.div`
    vertical-align: middle;
    display: table-cell;`

const Label = styled.div`
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  width: 45px;
  color: ${({ right }) => right ? '#666' : '#ededed'};
  `

const Slide = styled.div`
  left: ${({ value }) => value ? 0 : -40}px;
  position: relative;
  transition: all .2s;
  font-family: Arial;
  font-weight: bold;
  font-size: 16px;
  display: table;
  height: 100%;
  width: ${({small}) => 90 + (small ? 35 : 45)}px;
  align-items: center;`

export default class ToggleSwitch extends React.Component {
  state = {
    value: firstDefined(
      this.props.value,
      this.props.defaultValue,
      false
    ),
  }
  static defaultProps = {
    leftLabel: 'ON',
    rightLabel: 'OFF',
    onChange: () => {},
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value === undefined) return
    this.setState({ value })
  }

  onClick = () => {
    const { disabled, onChange } = this.props
    if (disabled) return
    const value = !this.state.value
    this.setState({ value })
    onChange(value)
  }

  render() {
    const { value } = this.state
    const { disabled, small, leftLabel, rightLabel } = this.props

    return (
      <Outer
        disabled={disabled}
        value={value}
        small={small}
        onClick={this.onClick}
      >
        <Slide value={value} small={small}>
          <Label>{leftLabel}</Label>
          <InnerWrapper><InnerBox small={small} /></InnerWrapper>
          <Label right>{rightLabel}</Label>
        </Slide>
      </Outer>
    )
  }
}
