import React from 'react'

const Caret = ({ north, south, east, west, width = 15, height = 11, style = {}, rotate = 90, transitionSpeed = 0 }) => {
  if (north) rotate = 180
  if (east) rotate = 270
  if (west) rotate = 90

  return (
    <svg
      fill="currentColor"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        WebkitTransform: `rotate3d(0,0,1,${rotate}deg)`,
        WebkitTransition: `-webkit-transform ${transitionSpeed}s`,
        transform: `rotate3d(0,0,1,${rotate}deg)`,
        transition: `transform ${transitionSpeed}s`,
        ...style
      }}
    >
      <path d={`M0 0l${width / 2} ${height} ${width / 2}-${height}z`}/>
    </svg>
  )
}

export default Caret;
