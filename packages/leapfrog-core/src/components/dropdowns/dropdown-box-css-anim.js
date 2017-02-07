// @flow
import styled from 'styled-components'
import React, { Component } from 'react'

const anim = ({ mode }) => {
  if ((mode === 'enter') || (mode === 'exit')) {
    return `opacity: 0; transform: scale3d(0.75,0.75,1);`
  } else {
    return `opacity: 1; transform: scale3d(1,1,1);`
  }
}

const transition = ({ mode }) => {
  if (mode === 'enter' || mode === 'show') {
    return `transition:
      transform 0.2s cubic-bezier(0.015, 0.830, 0.305, 0.985),
      opacity 0.2s cubic-bezier(0.015, 0.830, 0.305, 0.985);`
  } else {
    return `transition:
      transform 0.2s cubic-bezier(0.605, 0.050, 0.960, 0.450),
      opacity 0.2s cubic-bezier(0.605, 0.050, 0.960, 0.450);`
  }
}

const Box = styled.div`
  ${({ right }) => right ? 'right: 0;' : ''}
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.45);
  background: #fff;
  z-index: 1;
  transform-origin: 50% 0;
  ${anim}
  transition:
    transform 0.2s cubic-bezier(0.015, 0.830, 0.305, 0.985),
    opacity 0.2s cubic-bezier(0.015, 0.830, 0.305, 0.985);
`


type DropDownBoxPropType = {
  onClickOutside: () => void,
  open: boolean,
  children: React.Element<*>,
}

export default class DropdownBox extends Component {
  innerClick: boolean = false;
  props: DropDownBoxPropType;
  el: HTMLElement;
  state = {
    mode: 'hide',
  }

  onDocumentClick = (e: Event) => {
    if (
      !this.el ||
      !(e.target instanceof HTMLElement)
    ) return
    if (!this.el.contains(e.target)) {
      setTimeout(() => {
        this.props.onClickOutside()
        document.removeEventListener('click', this.onDocumentClick)
      }, 0)
    }
  };

  componentWillMount() {
    if (this.props.open) {
      document.addEventListener('click', this.onDocumentClick)
    }
  }

  componentWillReceiveProps(nextProps: DropDownBoxPropType) {
    if (!this.props.open && nextProps.open) {
      clearTimeout(this.timer)
      document.addEventListener('click', this.onDocumentClick)
      this.setState({'mode': 'enter'})
      this.timer = setTimeout(() => this.setState({'mode': 'show'}), 16)
    }
    if (this.props.open && !nextProps.open) {
      document.removeEventListener('click', this.onDocumentClick)
      clearTimeout(this.timer)
      this.setState({'mode': 'exit'})
      this.timer = setTimeout(() => this.setState({'mode': 'hide'}), 1000)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
  }

  render() {
    const {
      open,
      children,
      right,
      ...props,
    } = this.props

    const { mode } = this.state

    if (mode === 'hide') return null

    return (
      <Box
        {...props}
        right={right}
        open={open}
        mode={mode}
        innerRef={(el: HTMLElement) => this.el = el || this.el}
      >
        {children}
      </Box>
    )
  }
}
