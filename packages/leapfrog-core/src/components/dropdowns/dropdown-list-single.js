// @flow

import React, { Component } from 'react'
import DropdownBox from './dropdown-box-css-anim'
import DropdownSearch from './dropdown-search'
import styled from 'styled-components'
import {
  focusFirst,
  focusLast,
  focusNext,
  focusPrev,
} from './dropdown-focus-helpers'
import googlish from '../../utils/googlish'

type OptionType = {
  label: string,
}

const visibleItemsQuery = 'li:not([hidden])'

const getLi = ({ hidden }) => hidden ? `
  height: 0;
  padding: 0 8px;
  overflow: 'hidden';
` : ''

const Ellipsis = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`

const Li = styled.li`
  margin: 0;
  padding: 0 20px;
  minHeight: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: vertical;
  vertical-align: middle;
  align-items: center;
  ${getLi}
  list-style: none;
  cursor: default;
  box-sizing: border-box;
  ${({ selected }) => selected ? 'background: #ccc;' : ''}
  &:focus {
    outline: none;
    border: 1px rgba(0,0,0,0.2) dashed;
    padding: 9px 19px;
  }
  &:hover {
    background: ${({ selected }) => selected ? '#ccc' : '#f5f5f5'};
  }`

const Ul = styled.ul`
  margin: 0;
  padding: 0px;
  max-height: 300px;
  width: 100%;
  overflow-y: auto;`

const SearchWrapper = styled.div`
  padding: 14px;
  border-bottom: 1px solid #ccc;
`

const DropdownWrapper = styled.div`
  text-align: left;
  width: 100%;
`

const Wrapper = styled.div`
  width: ${({ width }) => width}px;
  display: flex;
  position: relative;
`

export default class SelectDropdown extends Component {
  state = {
    isOpen: false,
    filter: '',
    selectedIndex: null,
    selected: this.props.value || this.props.defaultValue || null,
  };

  static defaultProps = {
    width: 200,
    filterFn: filterText => ({ label }) => googlish(filterText)(label),
  }

  onDown = (e) => {
    if (e.keyCode === 40 || e.keyCode === 32) {
      this.setState({ isOpen: true })
      this.focusFirst()
      e.preventDefault()
    }
  }

  focusLast = () => focusLast(
    this.ul,
    visibleItemsQuery
  )

  focusFirst = () => focusFirst(
    this.ul,
    this.input,
    this.props.filter,
    visibleItemsQuery
  )
  focusNext = () => focusNext(
    this.ul,
    this.input,
    this.props.filter,
    visibleItemsQuery
  )

  focusPrev = () => focusPrev(
    this.ul,
    this.input,
    this.props.filter,
    visibleItemsQuery
  )

  onKeyDown = (event: Event) => {
    const key = {
      38: 'UP',
      40: 'DOWN',
      33: 'PAGEUP',
      34: 'PAGEDOWN',
      27: 'ESC',
      13: 'ENTER',
      32: 'SPACE',
    }[event.keyCode]
    if (key && !(key === 'SPACE' && event.target === this.input)) {
      event.preventDefault()
      event.stopPropagation()
    }
    switch (key) {
      case 'UP':
        this.focusPrev()
        break
      case 'DOWN':
        this.focusNext()
        break
      case 'PAGEUP':
        this.focusFirst()
        break
      case 'PAGEDOWN':
        this.focusLast()
        break
      case 'ESC':
        this.setState({ isOpen: false })
        break
    }
  }

  setSelected = item => {
    const { value, onChange } = this.props
    if (onChange && item !== this.state.selected) {
      onChange(item)
    }
    if (value === undefined && item !== this.state.selected) {
      this.setState({
        selected: item,
      })
    }

    // clearTimeout(this.timeout)
    // this.timeout = setTimeout(
    //   () => {
        this.button.focus()
        this.setState({ isOpen: false })
    //   },
    //   0
    // )
  }

  onKeyDown2 = item => (event: Event) => {
    const key = {
      13: 'ENTER',
      32: 'SPACE',
    }[event.keyCode]

    if (!key) return
    this.setSelected(item)
  }

  onButtonClick = (e) => {
    this.setState({ isOpen: !this.state.isOpen })
    e.preventDefault()
  }

  onChangeFilter = ({ target }: Event) => {
    if (
      !(target instanceof HTMLInputElement) ||
      target === null
    ) return
    this.setState({ filter: target.value })
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  componentWillReceiveProps({ value }) {
    if (value !== undefined && value !== this.state.selected) {
      this.setState({ selected: value })
    }
  }

  render () {
    const {
      filter,
      selected,
    } = this.state
    const {
      right,
      onGray,
      options,
      title,
      filterFn,
      noWrap,
      width,
      button: Button,
    } = this.props

    return (
      <Wrapper width={width}>
        <Button
          onGray={onGray}
          onKeyDown={this.onDown}
          onClick={this.onButtonClick}
          innerRef={(button: HTMLElement) => { if (button) this.button = button }}
        >
          {
            selected === null ?
              title :
              selected.label
          }
        </Button>
        <DropdownBox
          onKeyDown={this.onKeyDown}
          right={right}
          open={this.state.isOpen}
          style={{ width: '100%' }}
          onClickOutside={() => this.setState({ isOpen: false })}
        >
          <DropdownWrapper
            role="menu"
            innerRef={(ul: HTMLElement) => { if (ul) this.ul = ul }}
          >
            <DropdownSearch
              show={this.props.filter}
              onChange={this.onChangeFilter}
              value={filter}
              onRef={el => this.input = el}
            />

            <Ul>
              {
                options
                .filter(filterFn(filter))
                .map(({ label }, i) => (
                  <Li
                    key={i}
                    tabIndex={0}
                    selected={selected === options[i]}
                    onKeyDown={this.onKeyDown2(options[i])}
                    onClick={() => this.setSelected(options[i])}
                  >
                    {
                      noWrap ?
                        <Ellipsis>{label}</Ellipsis> :
                        label
                    }
                  </Li>
                ))
              }
            </Ul>
          </DropdownWrapper>
        </DropdownBox>
      </Wrapper>
    )
  }
}
