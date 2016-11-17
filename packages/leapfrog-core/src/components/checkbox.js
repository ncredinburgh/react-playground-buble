import React from 'react'
import styled from 'styled-components'
import { Checkmark } from '@di/leapfrog-icons'

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

const getLabel = ({ margin, inline }) => `
  margin: ${margin === undefined ? '8px 25px 8px 0' : margin};
  display: ${inline ? 'inline-flex' : 'flex'};
  ${inline && margin === undefined ?
    `&:last-child {
      margin-right: 0;
    }` : ''
  }`

const Box = styled.div`
  ${getGutter}
  display: flex;
  box-sizing: border-box;
  width: ${getSize};
  height: ${getSize};
  border: 2px solid #666;
  color: #666;
  ${getDisabled}
  align-items: center;
  justify-content: center;`

const Label = styled.label`
  ${getLabel}
  alignItems: center;
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
`

const Icon = styled(Checkmark)`
opacity: 0;
transform: scale3d(0,0,1);
transition: .15s all;
transition-timing-function: ease-out;
  user-select: none;
`

const Checkbox = ({
  small,
  gutter,
  children,
  before,
  margin,
  inline,
  ...props
}) => (
  <Label margin={margin} inline={inline}>
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
