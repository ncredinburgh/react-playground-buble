import React from 'react'
import styled, { css } from 'styled-components'
import {
  fromCss,
  lighten,
  darken,
  toCss,
  luminance
} from 'color-array'

const primaryStyles = ({
  primary,
  disabled,
  theme: {
    sectionAColor,
    sectionATextColor,
    useLightAccent,
  },
}) => {
  if (!primary) return ''
  const rgbaArr = fromCss(sectionAColor)
  let bottom
  let top
  let hoverColor

  if (useLightAccent) {
    top = toCss(lighten(rgbaArr, 0.18))
    bottom = sectionAColor
    hoverColor = toCss(lighten(rgbaArr, 0.25))
  } else {
    top = sectionAColor
    bottom = toCss(darken(rgbaArr, 0.18))
    hoverColor = toCss(darken(rgbaArr, 0.25))
  }

  return `
border: 0px solid #acacac;
border-radius: 2px;
backgroundImage: linear-gradient(to bottom,${top} 0, ${bottom} 100%);
color: ${sectionATextColor};
${
  disabled ? '' :
  `&:hover {
    backgroundImage: linear-gradient(to bottom,${hoverColor} 0, ${hoverColor} 100%);
  }`
}`
}

const secondaryStyles = ({ primary, tertiary, disabled }) =>
  primary || tertiary ? '' :
`background-image: linear-gradient(#fff 0px, #ddd 100%);
color: #333333;
${
  disabled ? '' :
  `&:hover {
    background-image: linear-gradient(to bottom, #ddd 0, #ddd 100%);
  }`
}`


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


// background-image: linear-gradient(to bottom,#fff 0,#ddd 100%);

const style = css`
  padding: 0 20px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.45);
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
