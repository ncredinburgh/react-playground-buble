// @flow

import React from 'react'
import WithCanvas from './with-canvas'

export default class Day extends React.Component {

  renderCanvas() {
    const {
      ctx,
      canvas,
      width,
      height,
    } = this
    const r = width / 2
    ctx.fillArc(r, r, r, 0, 2 * Math.PI)
  }

  canvasUpdated(canvas, sf) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.ctx.scale(sf, sf)
    this.width = canvas.width / sf
    this.height = canvas.width / sf
    this.renderCanvas()
  }

  render () {
    return (
      <WithCanvas width={200} height={200}>
        {this.canvasUpdated}
      </WithCanvas>
    )
  }
}
