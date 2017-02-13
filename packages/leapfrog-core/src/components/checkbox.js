import React from 'react'
import styled from 'styled-components'
import { Checkmark } from '@di-internal/leapfrog-icons'
import { getSectionCColor } from '../utils/theme-util'

const getGutter = ({ gutter, hasChildren, before, small }) => {
  if (hasChildren) {
    let gap = gutter
    if (gutter === undefined) {
      gap = small ? 15 : 20
    }
    return before ?
      `margin-left: ${gap}px;` :
      `margin-right: ${gap}px;`
  }
  return ''
}

const getSize = ({ small }) =>
  `${small ? 20 : 30}px`

const getDisabled = ({ disabled }) =>
  disabled ? `
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;` :
    ''

const getLabel = ({ margin, padding, inline }) => `
  margin: ${margin === undefined ? '8px 25px 8px 0' : margin};
  padding: ${padding === undefined ? '0' : padding};
  display: ${inline ? 'inline-flex' : 'flex'};
  ${inline && margin === undefined ?
    `&:last-child {
      margin-right: 0;
    }` : ''
  }`

const Box = styled.div`
  ${getGutter}
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
  width: ${getSize};
  height: ${getSize};
  border: 2px solid ${getSectionCColor};
  color: ${getSectionCColor};
  ${getDisabled}
  align-items: center;
  justify-content: center;`

const Label = styled.label`
  user-select: none;
  ${getLabel}
  align-items: center;
  position: relative;`

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  &:checked+div>svg {
    opacity: 1;
    transform: scale3d(1,1,1);
  }
  &:focus+div, &:active+div {
    box-shadow: 0 0 5px rgba(0,0,0,0.4);
  }
`

const Icon = styled(Checkmark)`
opacity: 0;
transform: scale3d(0.3,0.3,1);
transition: .15s all cubic-bezier(0.215, 0.61, 0.355, 1);
user-select: none;
`

const Checkbox = ({
  small,
  gutter,
  children,
  before,
  margin,
  inline,
  padding,
  ...props
}) => (
  <Label margin={margin} padding={padding} inline={inline}>
    {before ? children : null}
    <Input
      {...props}
      type="checkbox"
      innerRef={el => { if (el) this.el = el }}
    />
    <Box
      {
        ...{
          gutter,
          hasChildren: !!children,
          before,
          small,
          disabled: props.disabled,
        }
      }
    >
      <Icon height={small ? 11 : 16} block />
    </Box>
    {before ? null : children}
  </Label>
)

export default Checkbox
