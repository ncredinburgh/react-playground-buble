import React from 'react'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'
import Canvas from './canvas'

import {
  fromCss,
  toCssRgba,
} from 'color-array'
const size = 40
const r = size / 2
const springConf = {
  stiffness: 250,
  damping: 28,
  precision: 0.01,
}

const Wrapper = styled.div`
  position: relative;
  width: ${size}px;
  height: ${size}px;
  cursor: default;
  user-select: none;
`

const Text = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  line-height: ${size}px;
  color: ${({ color }) => color};
  transition: color 0.3s;
`

const Circle = styled.circle`
  fill: ${({ fill }) => fill};
  transition: fill 0.3s;
`

const DayCanvas = ({
  children,
  color,
  fill,
  showCircle,
  hoopColor,
}) => {
  const [fillR, fillG, fillB, fillA] = fromCss(fill).map(spring)
  const [colorR, colorG, colorB, colorA] = fromCss(color).map(spring)

  const fillRgba = fromCss(fill).map(spring)

  return (
    <Wrapper>
        <Motion style={{
          radius: spring(showCircle ? 18 : 8, springConf),
          fillR, fillG, fillB, fillA,
          colorR, colorG, colorB, colorA,
        }}>
          {
            ({ radius, fillRgba, fillR, fillG, fillB, fillA, colorR, colorG, colorB, colorA }) => (
              <div>
              <Canvas
                width={size}
                height={size}
                style={{ display: 'block' }}
              >
                {
                  (canvas, sf) => {
                    const ctx = canvas.getContext('2d')
                    ctx.save()
                    ctx.scale(sf, sf)
                    ctx.clearRect(0, 0, size, size)
                    ctx.beginPath()
                    ctx.fillStyle = toCssRgba([fillR, fillG, fillB, fillA])
                    //ctx.fillColor = toCssRgba([colorR, colorG, colorB, colorA])
                    ctx.arc(r, r, radius, 0, 2 * Math.PI, false)
                    ctx.fill()
                    if (hoopColor) {
                      ctx.beginPath()
                      ctx.strokeStyle = hoopColor
                      ctx.arc(r, r, 18, 0, 2 * Math.PI, false)
                      ctx.stroke()
                    }
                    ctx.restore()
                  }
                }
              </Canvas>
              </div>
            )
          }
        </Motion>
      <Text color={color}>{children}</Text>
    </Wrapper>
  )
}

DayCanvas.defaultProps = {
  radius: 20,
}

export default DayCanvas
