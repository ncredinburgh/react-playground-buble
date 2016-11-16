import React from 'react'
import Svg from './svg'

export const AlertError = props => (
  <Svg viewBox="0 0 18 18" {...props}>
    <path fill="#c90202" d="M17.6 14.7L10.7 1.4C10.2.5 9.6 0 9 0S7.8.5 7.3 1.4L.4 14.7c-.5 1-.5 1.8-.2 2.4s1.1.9 2.1.9h13.4c1 0 1.7-.3 2.1-.9.3-.6.3-1.5-.2-2.4zM9 16c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm.7-4.3H8.3L8 5h2l-.3 6.7z" />
  </Svg>
)

export const AlertWarning = props => (
  <Svg viewBox="0 0 18 18" {...props}>
    <path fill="#FEC82A" d="M2.3 18c-1 0-1.8-.3-2.1-.9-.4-.6-.3-1.4.2-2.4L7.3 1.4C7.8.5 8.4 0 9 0s1.2.5 1.7 1.4l6.9 13.3c.5.9.5 1.8.2 2.4-.4.6-1.1.9-2.1.9H2.3z" />
    <path fill="#333" d="M8.3 11.7L8 5h2l-.3 6.7z" />
    <circle fill="#333" cx="9" cy="15" r="1" />
  </Svg>
)

export const Scheduled = props => (
  <Svg viewBox="0 0 18 18" {...props}>
    <g fill="#2e6f03">
      <path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 17c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
      <path d="M13.6 12.1L9.5 8.8V2.6H8.3v6.6L13 13z" />
    </g>
  </Svg>
)

export const Success = props => (
  <Svg viewBox="0 0 18 18" {...props}>
    <path fill="#2e6f03" d="M3 7.3l4.2 3.8L15.1 0s1.7-.1 2.4.7c.7.9.5 2.8.5 2.8L7.3 18 0 10.8S-.2 8.9.6 8 3 7.3 3 7.3z" />
  </Svg>
)

export const TurboTax = props => (
  <Svg viewBox="0 0 18 18" {...props}>
    
    <path d="M.5 9A8.5 8.5 0 1 0 9 .5 8.52 8.52 0 0 0 .5 9" fill="#d52b1e" />
    <path d="M16.12 5.92a10.68 10.68 0 0 0-1.7-2.55 26.06 26.06 0 0 0-6.91 7.54A11.3 11.3 0 0 0 4.22 7.3L2.52 9a18.86 18.86 0 0 1 5.1 5.74 30.73 30.73 0 0 1 8.5-8.82" fill="#fff" />
  </Svg>
)

