// @flow
import styled from 'styled-components'
import React, { Component } from 'react'
import TransitionGroup from 'react-addons-transition-group'
import { TransitionMotion, spring, stripStyle } from 'react-motion'
import SlideDown from '../slide-down-box'

const Box = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  ${({ right }) => right ? 'right: 0;' : ''}
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.45);
  background: #fff;
  z-index: 1;
  transform-origin: 50% 0;
`

const springConf = {
  stiffness: 300,
  damping: 28,
  precision: 0.01,
}

const springConfIn = {
  stiffness: 200,
  damping: 28,
  precision: 0.01,
}

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

  willLeave(style) {
    return {
      opacity: spring(0, springConf),
      sf: spring(0.95, springConf),
    }
  }

  willEnter(style) {
    return {
      opacity: 0,
      sf: 0.95,
    }
  }

  render() {
    const {
      open,
      children,
      right,
      ...props,
    } = this.props

    return (

      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        styles={open ? [{
          key: "1",
          style: {
            opacity: spring(1, springConfIn),
            sf: spring(1, springConf)
          },
        }] : []}
      >
        {
          interpolatedStyles => (
            <div style={{overflow: 'hidden'}}>
              {
                interpolatedStyles.map(config => (
                  <Box
                    key="1"
                    {...props}
                    style={{
                      opacity: config.style.opacity,
                      transform: `scale3d(${config.style.sf},${config.style.sf},1)`,
                      ...props.style,
                    }}
                    open={true}
                    right={right}
                    innerRef={(el: HTMLElement) => this.el = el || this.el}
                  >
                    {children}
                  </Box>
                ))
              }
            </div>
          )


        }
      </TransitionMotion>
    )
  }
}
