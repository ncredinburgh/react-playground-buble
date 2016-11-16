import React from 'react'
import Svg from './svg'

export const PageLoader = props => (
  <Svg viewBox="0 0 18 18" {...props}>
    <g fill="none" stroke="#bbb" strokeMiterlimit="10" strokeWidth="1.75">
      <circle cx="9" cy="9" r="7.9" opacity=".5" />
      <path d="M1.1 9A7.9 7.9 0 0 1 9 1.1" strokeLinecap="square" />
    </g>
  </Svg>
)

export const SmallLoader = props => (
  <Svg viewBox="0 0 18 18" {...props}>
    <path fill="#ccc" d="M13.43 1.17l-1.74 3a5.5 5.5 0 1 1-5.4 0l-1.77-3a9 9 0 1 0 8.91 0z" />
  </Svg>
)

