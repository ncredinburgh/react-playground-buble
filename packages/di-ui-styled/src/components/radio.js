import React from 'react'
import styled from 'styled-components'
import { Checkmark } from '@di-internal/di-ui-icon-elements'
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

const getInner = ({ small }) =>
  `width: ${small ? 12 : 18}px;
  height: ${small ? 12 : 18}px;`

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
  border: 2px solid ${getSectionCColor};
  color: ${getSectionCColor};
  ${getDisabled}
  align-items: center;
  border-radius: 40px;
  justify-content: center;`

const BoxInner = styled.div`
  background-color: ${getSectionCColor};
  border-radius: 40px;
  ${getInner}
  opacity: 0;
  transform: scale3d(0,0,1);
  transition: .15s all;
  transition-timing-function: ease-out;`


const Label = styled.label`
  ${getLabel}
  align-items: center;
  position: relative;`

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  &:checked+div>div {
    display: block;
    opacity: 1;
    transform: scale3d(1,1,1);
  }`

const Radio = ({
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
      type="radio"
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
      <BoxInner
        small={small}
      />
    </Box>
    {before ? null : children}
  </Label>
)

export default Radio
