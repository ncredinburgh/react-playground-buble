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
  return null
}

const getSize = ({ small }) =>
  `${small ? 20 : 30}px`

const getDisabled = ({ disabled }) =>
  disabled ? `
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;` :
    null

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
  alignItems: center;
  display: flex;
  position: relative;`

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  &:checked+div>svg {
    display: block;
  }
`

const Icon = styled(Checkmark)`
  display: none;
`

const Checkbox = ({
  small,
  gutter,
  children,
  before,
  ...props
}) => (
  <Label>
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
      <Icon height={small ? 11 : 16} />
    </Box>
    {before ? null : children}
  </Label>
)

export default Checkbox
