// @flow

import React from 'react'

type WithCanvasType = {
  width: number,
  height: number,
  children: (canvas: HTMLElement, sf: number) => React.Element<*>,
}

export default class WithCanvas extends React.Component {
  props: WithCanvasType

  update = () => {
    const { children } = this.props
    const { canvas, sf } = this
    children(canvas, sf)
  }

  componentWillReceiveProps({ width, height }) {
    //const { props } = this
    //if (width !== props.width || height !== props.height) {
      this.update()
    //}
  }

  componentDidMount = this.update

  render() {
    const {
      width,
      height,
    } = this.props

    this.sf = window.devicePixelRatio || 1

    return (
      <canvas
        width={width * this.sf}
        height={height * this.sf}
        style={{
          width: width ,
          height: height,
        }}
        ref={el => { if (el !== null) this.canvas = el }}
      />
    )
  }
}
