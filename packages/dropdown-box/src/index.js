// @flow

import React, { Component } from 'react'

type DropDownBoxPropType = {
  /**
   * What to do when a user clicks outside DropdownBox
   * @examples () => this.setState({closed: true})
   */
  onClickOutside: () => void,
  /**
   * is the DropdownBox open
   * @examples true, false
   */
  open: boolean,
  /**
   * Contents of DropdownBox
   * @examples <DropdownBox>Hello</Dropdownbox>
   */
  children: mixed,
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
    } = this.props

    if (!open) return null

    return (
      <div
        ref={(el: HTMLElement) => this.el = el || this.el}
        style={{
          ...styles.dropdown,
          ...{
            display: open ? 'block' : 'none',
          },
          ...(right ? { right: 0 } : {}),
        }}
      >
        {children}
      </div>
    )
  }
}

const styles = {
  dropdown: {
    position: 'absolute',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.45)',
    background: 'white',
    zIndex: 1,
  },
}
