// @flow

import React, { Component } from 'react'
import DropdownBox from './dropdown-box'
import Checkbox from '../checkbox'
import DropdownSearch from './dropdown-search'
import Spacer from '../spacer'
import styled from 'styled-components'
import { googlish } from '@di-internal/leapfrog-util'
import {
  focusFirst,
  focusLast,
  focusNext,
  focusPrev,
} from './dropdown-focus-helpers'

const visibleItemsQuery = 'li:not([hidden]) input'

const getLi = ({ hidden }) => hidden ? `
  height: 0;
  padding: 0 8px;
  overflow: 'hidden';
` : ''

const Li = styled.li`
  margin: 0;
  padding: 0px;
  ${getLi}
  list-style: none;
  ${({ nowrap }) => nowrap ? 'white-space: nowrap;' : ''}
  &:hover {
    background-color: #f5f5f5;
  }`

const Ul = styled.ul`
  margin: 0;
  padding: 0px;
  maxHeight: 300px;
  overflowY: auto;`

const DropdownWrapper = styled.div`
  text-align: left;
  width: 100%;
`

const Wrapper = styled.div`
  width: ${({ width }) => width}px;
  display: flex;
  position: relative;
`

type OptionsType = {
  value: string,
  label: string,
}

type MultiselectDropdownPropsType = {
  onChange?: (value: Array<string>) => void,
  options: Array<OptionsType>,
  value?: Array<string>,
  defaultValue?: Array<string>,
  name?: string,
  title: string,
  onGray?: boolean,
}

export default class MultiselectDropdown extends Component {
  state = {
    isOpen: false,
    filter: '',
    selected: this.props.defaultValue || [],
  };
  ul: Element | null = null

  props: MultiselectDropdownPropsType;

  static defaultProps = {
    width: 200,
    filterFn: filterText => ({ label }) => googlish(filterText)(label),
  }

  onButtonClick = (e) => {
    this.setState({ isOpen: !this.state.isOpen })
    e.preventDefault()
  }

  onDown = (e) => {
    if (e.keyCode !== 40) return
    this.setState({ isOpen: true })
    this.focusFirst()
    e.preventDefault()
  }

  onCheck = ({ target }: Event) => {
    const { ul } = this
    if (
      !(target instanceof HTMLInputElement) ||
      target == null ||
      ul == null
    ) return
    const onChange = this.props.onChange || (() => {})
    const nextValue = ([].slice.call(ul.querySelectorAll('input')) || [])
      .filter((input: HTMLInputElement) => input.checked)
      .map((input: HTMLInputElement) => input.value)
    if (target.checked) {
      this.setState({ selected: [...nextValue, target.value] })
      onChange([...nextValue, target.value])
    } else {
      this.setState({ selected: nextValue })
      onChange(nextValue)
    }
  }

  onChangeFilter = ({ target }: Event) => {
    if (
      !(target instanceof HTMLInputElement) ||
      target === null
    ) return
    this.setState({ filter: target.value })
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
    }[event.keyCode]
    if (key) {
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
        this.focusLastLi()
        break
      case 'ESC':
        this.setState({ isOpen: false })
        break
    }
  }

  matchesFilter = ({ label }) =>
    label.substr(0, this.state.filter.length).toLowerCase() ===
      this.state.filter.toLowerCase()

  render() {
    const {
      options,
      value,
      defaultValue,
      name,
      title,
      onGray,
      right,
      filterFn,
      nowrap,
      width,
      button: Button,
    } = this.props

    const {
      filter,
    } = this.state

    const appliedFilter = filterFn(filter)

    return (
      <Wrapper width={width}>
        <Button
          id="dLabel2"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
          title="Select One ..."
          onClick={this.onButtonClick}
          onGray={onGray}
          onKeyDown={this.onDown}
        >
          {title}
        </Button>
        <DropdownBox
          style={{ width: '100%' }}
          onKeyDown={this.onKeyDown}
          right={right}
          open={this.state.isOpen}
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
                  // .filter(({ label }) =>
                  //   label.substr(0, this.state.filter.length).toLowerCase() ===
                  //     this.state.filter.toLowerCase())
                  .map((option) => {
                    const inputProps = {
                      type: 'checkbox',
                      value: option.value,
                      name,
                      onChange: this.onCheck,
                      checked: undefined,
                      defaultChecked: undefined,
                    }

                    if (value instanceof Array) {
                      inputProps.checked =
                        value.includes(option.value)
                    } else if (defaultValue instanceof Array) {
                      inputProps.defaultChecked =
                        this.state.selected.includes(option.value)
                    }
                    return (
                      <Li
                        key={option.value}
                        hidden={!appliedFilter(option)}
                        nowrap={nowrap}
                      >
                        <Checkbox
                          {...inputProps}
                          small
                          margin="0px"
                          padding="20px"
                        >
                          {option.label}
                        </Checkbox>
                      </Li>
                    )
                  }
                )
              }
            </Ul>
          </DropdownWrapper>
        </DropdownBox>
      </Wrapper>
    )
  }
}
