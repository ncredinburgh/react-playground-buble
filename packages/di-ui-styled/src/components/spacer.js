// @flow

import React from 'react'

const Spacer = ({ width = 10, height = 10 }) => (
  <div
    style={{
      display: 'inline-block',
      width,
      height,
    }}
  />
)

export default Spacer
