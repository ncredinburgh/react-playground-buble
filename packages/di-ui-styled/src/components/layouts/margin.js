import React from 'react'
import styled, { css } from 'styled-components'


const primaryCss = ({ top, left, bottom, right }) => css`
  margin: ${top === undefined ? 30 : top}px ${right === undefined ? 30 : right}px ${bottom === undefined ? 40 : bottom}px ${left === undefined ? 30 : left}px;
  @media screen and (max-width: 992px) {
    margin: ${top === undefined ? 20 : top}px ${right === undefined ? 20 : right}px ${bottom === undefined ? 30 : bottom}px ${left === undefined ? 20 : left}px;
  }
`

const secondaryCss = ({ top, left, bottom, right }) => css`
  margin: ${top === undefined ? 20 : top}px ${right === undefined ? 20 : right}px ${bottom === undefined ? 30 : bottom}px ${left === undefined ? 20 : left}px;
`

const Margin = styled.div`
  ${args => args.secondary ? secondaryCss(args) : primaryCss(args)}
`

export default Margin
