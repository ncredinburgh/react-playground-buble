import React from 'react'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'
const size = 40
const r = size / 2

const Wrapper = styled.div`
  position: relative;
  width: ${size}px;
  height: ${size}px;
  cursor: default;
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

const DaySvg = ({
  children,
  color,
  fill,
  showCircle,
}) => (
  <Wrapper>
    <svg viewBox={`0 0 ${size} ${size}`}>
      <Motion style={{
        radius: spring(showCircle ? 18 : 0),
        opacity: spring(showCircle ? 1 : 0),
      }}>
        {
          ({ radius, opacity }) =>
            <Circle
              cx={r}
              cy={r}
              r={radius}
              fill={fill}
              opacity={opacity}
            />
        }
      </Motion>
    </svg>
    <Text color={color}>{children}</Text>
  </Wrapper>
)

DaySvg.defaultProps = {
  radius: 20,
}

export default DaySvg
