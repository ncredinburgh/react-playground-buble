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

const getInner = ({ small, checked }) =>
  `width: ${small ? 12 : 18}px;
  height: ${small ? 12 : 18}px;
  opacity: ${checked ? 1 : 0};
  transform: scale3d(${checked ? '1,1,1' : '0.25,0.25,1'});`

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
  border: 1px solid #666;
  color: #666;
  ${getDisabled}
  align-items: center;
  border-radius: 40px;
  justify-content: center;`

const BoxInner = styled.div`
  background-color: #666;
  border-radius: 40px;
  ${getInner}
  transition: .15s all;
  transition-timing-function: ease-out;
`
// transfrom: scale3d(1,1,1);

const Label = styled.label`
  alignItems: center;
  display: flex;
  position: relative;
`

export default class Checkbox extends React.Component {
  state = { checked: undefined }

  onDeselect = () => {
    this.setState({ checked: false })
  }

  componentDidMount() {
    this.el.addEventListener('deselect', this.onDeselect)
  }

  componentWillUnmount() {
    this.el.removeEventListener('deselect', this.onDeselect)
  }


  onChange = (e) => {
    const { onChange } = this.props
    this.setState({ checked: e.target.checked })
    if (onChange) onChange(e)
    const name = e.target.getAttribute('name')
    if (!name) return
    let radios = document.querySelectorAll(`input[type=radio][name=${name}]:not(:checked)`)
    radios = [...radios]
    radios.forEach(el => el.dispatchEvent(new Event('deselect')))
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
          <BoxInner
            small={small}
            checked={this.getChecked()}
          />
        }
        </Box>
        <input
          {...props}
          type="radio"
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
