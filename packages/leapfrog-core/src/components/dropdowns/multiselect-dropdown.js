// @flow

import React, { Component } from 'react'
import DropdownBox from './dropdown-box'
import Checkbox from '../checkbox'
import Button from '../button'
import Caret from '../caret-svg'
import TextInput from '../text-input'
import Spacer from '../spacer'
import styled from 'styled-components'

const getLi = ({ hidden }) => hidden ? `
  height: 0;
  padding: 0 8px;
  overflow: 'hidden';
` : ''

const Li = styled.li`
  margin: 0;
  padding: 8px;
  ${getLi}
  list-style: none;
  white-space: nowrap;`

const Ul = styled.ul`
  margin: 0;
  padding: 8px 10px 5px;
  maxHeight: 300px;
  overflowY: auto;`

const SearchWrapper = styled.div`
  padding: 14px;
  border-bottom: 1px solid #ccc;
`

const DropdownWrapper = styled.div`
  text-align: left;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.45);
  background: white;
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

  onButtonClick = (e) => {
    this.setState({ isOpen: !this.state.isOpen })
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
      link,
    } = this.props

    const {
      filter,
    } = this.state

    return (
      <div>
        <Button
          id="dLabel2"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
          title="Select One ..."
          onClick={this.onButtonClick}
          onGray={onGray}
        >
          {title}
          <Spacer />
          <Caret />
        </Button>
        <DropdownBox
          right={right}
          open={this.state.isOpen}
          onClickOutside={() => this.setState({ isOpen: false })}
        >
          <DropdownWrapper
            role="menu"
            innerRef={(ul: HTMLElement) => { if (ul) this.ul = ul }}
          >
            <SearchWrapper>
              <TextInput
                style={{ minWidth: 40 }}
                placeholder="Search"
                value={filter}
                onChange={this.onChangeFilter}
                small
              />

            </SearchWrapper>
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
                        hidden={!this.matchesFilter(option)}
                      >
                        <Checkbox {...inputProps} small>
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
      </div>
    )
  }
}
