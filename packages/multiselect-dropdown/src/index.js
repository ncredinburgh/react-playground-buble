// @flow

import React, { Component } from 'react'
import DropdownBox from '@di/dropdown-box'
import Spacer from './spacer'

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

    const wrapperClasses = `di dropdown open${onGray ? ' on-gray' : ''}`
    const button = (
      <button
        className="toggle"
        id="dLabel2"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
        title="Select One ..."
        onClick={this.onButtonClick}
      >
        <span className="ddlabel">
          {title}
        </span>
        <span className="caret" />
      </button>
    )

    const linkTag = (
      <div
        style={{display: 'inline-block'}}
        onClick={this.onButtonClick}
      >
        <a href="" onClick={e => e.preventDefault()}>
          Show columns
        </a>
          {<Spacer />}
        <span className="caret" />
      </div>
    )

    return (
      <div className={wrapperClasses}>
        {link ? linkTag : button}
        <DropdownBox
          right={right}
          open={this.state.isOpen}
          onClickOutside={() => this.setState({ isOpen: false })}
        >
          <div
            role="menu"
            ref={(ul: HTMLElement) => { if (ul) this.ul = ul }}
            style={styles.dropdown}
          >
            <div className="form-group-sm" style={styles.searchWrapper}>
              <input
                style={{ minWidth: 40 }}
                className="form-control"
                placeholder="Search"
                value={filter}
                onChange={this.onChangeFilter}
              />
            </div>
            <ul style={styles.ul}>
              {
                options
                  // .filter(({ label }) =>
                  //   label.substr(0, this.state.filter.length).toLowerCase() ===
                  //     this.state.filter.toLowerCase())
                  .map((option) => {
                    const inputProps = {
                      type: 'checkbox',
                      value: option.value,
                      className: 'sm',
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
                      <li
                        key={option.value}
                        style={this.matchesFilter(option) ?
                          styles.li :
                          styles.liHidden
                        }
                      >
                        <label className="di-checkbox" style={{position: 'relative'}}>
                          <input {...inputProps} />
                          <span className="lbl sm">
                            {option.label}
                          </span>
                        </label>
                      </li>
                    )
                  }
                )
              }
            </ul>
          </div>
        </DropdownBox>
      </div>
    )
  }
}

const styles = {
  dropdown: {
//    position: 'absolute',
//    right: 0,
    textAlign: 'left',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.45)',
    background: 'white',
    zIndex: 1,
  },
  searchWrapper: {
    padding: 14,
    borderBottom: '1px solid #ccc',
  },
  ul: {
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 5,
    maxHeight: 300,
    overflowY: 'auto',
  },
  li: {
    margin: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    listStyle: 'none',
    whiteSpace: 'nowrap',
  },
  liHidden: {
    height: 0,
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
    listStyle: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}
