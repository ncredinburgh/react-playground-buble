import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import {
  lightenCssColor,
  darkenCssColor,
  opacityCssColor,
} from '@di/leapfrog-util'

const hoverGradient = ({
  useLightAccent,
  darkenGradient,
  darkenHover,
  color,
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
  const midPoint = Math.round(darkenGradient * 1000 / darkenHover) / 10
  console.log(lighter)
  const start = `
    background-color: ${lighter};
    background-image: linear-gradient(to bottom,${opacity} 0, ${darker} 100%);
  `

  const end = `
  background-color: ${hoverColor};
  background-image: none;
  `
  console.log(color, lighter, darker, hoverColor)
  // const color = keyframes`
  //   0% { background-color: ${lighter}; }
  //   100% { background-color: ${hoverColor}; }
  const anim = keyframes`
    0% {
      ${start}
    }
    ${midPoint - 0.1}% {
      background-color: ${darker};
      background-image: linear-gradient(to bottom,${opacity} 0, ${darker} 100%);
    }
    ${midPoint}% {
      background-color: ${darker};
      background-image: none;
    }
    100% {
      background-image: none;
      background-color: ${hoverColor};
    }
  `
  return { start, end, anim }
}

const primaryStylesOld = ({
  primary,
  disabled,
  theme: {
    sectionAColor,
    sectionATextColor,
    useLightAccent,
  },
}) => {
  console.log(hoverFlatDark({
    useLightAccent,
    darkenGradient: 0.18,
    darkenHover: 0.25,
    color: sectionAColor,
  }))
  if (!primary) return ''
  let darker
  let lighter

  let hoverColor

  if (useLightAccent) {
    lighter = lightenCssColor(sectionAColor, 0.18)
    darker = sectionAColor
    hoverColor = lightenCssColor(sectionAColor, 0.25)
  } else {
    darker = darkenCssColor(sectionAColor, 0.18)
    lighter = sectionAColor
    hoverColor = darkenCssColor(sectionAColor, 1)
  }
  const opacity = opacityCssColor(darker, 0)
  return `
border: 0px solid #acacac;
border-radius: 2px;
background-color: ${lighter};
background-image: linear-gradient(to bottom,${opacity} 0, ${darker} 100%);
color: ${sectionATextColor};
${
  disabled ? '' :
  `&:hover {
    background-color: red;
  }`
}`
}

const primaryStyles = ({
  primary,
  disabled,
  theme: {
    sectionAColor,
    sectionATextColor,
    useLightAccent,
  },
}) => {
  const grad = hoverGradient({
    useLightAccent,
    darkenGradient: 0.18,
    darkenHover: 0.25,
    color: sectionAColor,
  })
  if (!primary) return ''

  return `
border: 0px solid #acacac;
border-radius: 2px;
${grad.start}

color: ${sectionATextColor};
${
  disabled ? '' :
  `&:hover {
    ${grad.end}
    animation: .2s ${grad.anim};
    animation-timing-function: linear;
  }`
}`
}

const secondaryStyles = ({ primary, tertiary, disabled, onGray }) => {
  if (primary || tertiary) return ''
  const grad = hoverGradient({
    useLightAccent: false,
    darkenGradient: onGray ? 0 : 0.18,
    darkenHover: 0.25,
    color: '#fff',
  })

  return `
${onGray ? 'border: 1px solid transparent;' : ''}
color: #333;
${grad.start}
${
  disabled ? '' :
  `&:hover {
    ${grad.end}
    animation: .2s ${grad.anim};
  }`
}`
}
const tertiaryStyles = ({ tertiary, disabled }) =>
  !tertiary ? '' :
`line-height: 35px;
height: 35px;
background: #fff;
font-size: 13px;
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
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.45);
  &:hover {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0);
  }
  will-change: box-shadow, background-color;
  transition: box-shadow 0.2s;
  z-index: 1;
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
