import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import {
  lightenCssColor,
  darkenCssColor,
  opacityCssColor,
} from '@di-internal/leapfrog-util'

const hoverGradient = ({
  useLightAccent,
  darkenGradient,
  darkenHover,
  color,
  length,
  borderSize,
}) => {
  let darker
  let lighter
  let hoverColor
  if (useLightAccent) {
    lighter = lightenCssColor(color, darkenGradient)
    darker = color
    hoverColor = lightenCssColor(color, darkenHover)
  } else {
    darker = darkenCssColor(color, darkenGradient)
    lighter = color
    hoverColor = darkenCssColor(color, darkenHover)
  }
  const opacity = opacityCssColor(darker, 0)
  const midPoint = darkenGradient * length / darkenHover
  const midColor = darkenCssColor(color, darkenGradient / 2)

  const init = `
    &:before {
      content: '';
      position: absolute;
      transition: opacity ${length}s;
      background: ${color};
      background: transparent linear-gradient(to bottom,${lighter} 0, ${darker} 100%);
      box-shadow: 0 1px 3px rgba(0,0,0,0.45);
      box-sizing: content-box;
      border: inherit;
      border-radius: inherit;
      will-change: opacity;
      opacity: 1;
      width: 100%;
      height: 100%;
      top: -${borderSize}px;
      left: -${borderSize}px;
      z-index: -1;
    }
    position: relative;
    background-color: ${hoverColor};
    transition: box-shadow ${length}s;`

  const hover = `&:hover:before {
    opacity: 0;
  }`
  return { init, hover }
}

const primaryStyles = ({
  primary,
  disabled,
  theme: {
    sectionCColor,
    sectionATextColor,
    useLightAccent,
  },
}) => {
  const grad = hoverGradient({
    useLightAccent,
    darkenGradient: 0.18,
    darkenHover: 0.25,
    color: sectionCColor,
    length: 0.3,
    borderSize: 0,
  })
  if (!primary) return ''

  return `
color: ${sectionATextColor};
border: 0px solid #acacac; border-radius: 2px;
${grad.init}
${disabled ? '' : grad.hover}`
}

const secondaryStyles = ({ primary, tertiary, disabled, onGray }) => {
  if (primary || tertiary) return ''
  const grad = hoverGradient({
    useLightAccent: false,
    darkenGradient: onGray ? 0 : 0.18,
    darkenHover: 0.25,
    color: '#fff',
    length: 0.3,
    borderSize: 1,
  })

  return `
border: 1px solid ${onGray ? 'transparent' : '#acacac'};
color: #333;
${grad.init}
${disabled ? '' : grad.hover}`
}

const tertiaryStyles = ({ tertiary, disabled }) =>
  !tertiary ? '' :
`line-height: 35px;
height: 35px;
background: #fff;
font-size: 13px;
transition: background-color 0.3s;
${
  disabled ? '' :
  `&:hover {
    border: 1px solid #ccc;
    background: #ccc;
  }`
}`

const disabledStyles = ({ disabled }) =>
  !disabled ? '' :
`opacity: 0.4`

const style = css`
  z-index: 0;
  -webkit-font-smoothing: antialiased;
  padding: 0 20px;
  border: 1px solid #acacac;
  line-height: 42px;
  height: 42px;
  display: inline-block;
  font-size: 18px;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: ${({ href }) => href ? 'pointer' : 'default'};
  white-space: nowrap;
  user-select: none;
  font-family: inherit;
  text-transform: none;
  overflow: visible;
  margin: ${({ margin }) => 0 || margin};
  box-sizing: border-box;
  text-decoration: none;
  ${primaryStyles}
  ${secondaryStyles}
  ${tertiaryStyles}
  ${disabledStyles}
  ${({ block, flex }) => (block || flex) && `display: block;`}
  ${({ flex }) => flex  && `flex: 1;`}
`

const factory = tag => {
  const Default = styled(tag)`${style}`
  Default.defaultProps = {
    secondary: true,
  }
  return Default
}

const Button = factory('button')
Button.A = factory('a')
Button.Div = factory('div')
Button.Span = factory('span')
Button.Li = factory('li')
Button.factory = factory
export default Button
