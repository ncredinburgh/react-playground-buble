import React from 'react'

const Svg = ({ title, desc, children, style, top, block, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    height="18"
    style={{
      ...(top ? {
        position: 'relative',
        top,
      } : {}),
      ...(block ? {
        display: 'block',
      } : {}),
      ...style,
    }}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    {desc ? <desc>{desc}</desc> : null}
    {children}
  </svg>
)

export default Svg
