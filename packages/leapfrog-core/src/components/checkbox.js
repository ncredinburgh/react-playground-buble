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
  content: ' ';
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
  position: relative;
`

export default class Checkbox extends React.Component {
  state = { checked: undefined }

  onChange = (e) => {
    const { onChange } = this.props
    this.setState({ checked: e.target.checked })
    if (onChange) onChange(e)
  }

  getChecked = () => {
    const { state, props } = this
    if (props.checked !== undefined) return props.checked
    if (state.checked !== undefined) return state.checked
    if (props.defaultChecked !== undefined) return props.defaultChecked
  }

  render() {
    const { onChange } = this
    const { small, gutter, children, before, ...props } = this.props
    return (
      <Label>
        {before ? children : null}
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
        {
          this.getChecked() ?
            <Checkmark height={small ? 11 : 16} block /> :
            null
        }
        </Box>
        <input
          {...props}
          type="checkbox"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
          }}
          onChange={onChange}
          ref={el => { if (el) this.el = el }}
        />
        {before ? null : children}
      </Label>
    )
  }

}
