// @flow
import styled from 'styled-components'
import React, { Component } from 'react'

const Box = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  ${({ right }) => right ? 'right: 0;' : ''}
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.45);
  background: #fff;
  z-index: 1;
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
      document.addEventListener('click', this.onDocumentClick)
    }
    if (this.props.open && !nextProps.open) {
      document.removeEventListener('click', this.onDocumentClick)
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

    if (!open) return null

    return (
      <Box
        {...props}
        right={right}
        open={open}
        innerRef={(el: HTMLElement) => this.el = el || this.el}
      >
        {children}
      </Box>
    )
  }
}
