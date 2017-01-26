// @flow

import React, { Component } from 'react'
import DropdownBox from '../dropdowns/dropdown-box'
import TextInput from '../text-input'
import DatePicker from './date-picker'
import styled from 'styled-components'
import { formatUsDate, getMonth, getDay } from './date-math'
import { Calendar } from '@di-internal/leapfrog-icons'
import { fromTheme } from '@di-internal/leapfrog-util'

const Wrapper = styled.div`
  width: 280px;
  display: flex;
  position: relative;
  user-select: none;
`

const InputWrapper = styled.div`
  position: relative;
`

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 12px;
  color: ${fromTheme('sectionAColor')};
`

export default class DateDropdown extends Component {
  state = {
    isOpen: false,
    value: getDay(this.props.value || this.props.defaultValue || null),
    textValue: '',
  }

  openPicker = () => {
    if (this.input) this.input.focus()
    this.setState({ open: true })
  }

  closePicker = () => {
    if (this.input) this.input.blur()
    this.setState({ open: false })
  }

  onSelect = ({ firstSelected }) => {
    const { onChange } = this.props
    this.setState({
      value: firstSelected,
    })
    if (onChange) onChange(firstSelected)
    this.closePicker()
  }

  getText = () => {
    const { range } = this.props
    if (!range) return formatUsDate(value)
  }

  render() {
    const { openPicker, closePicker, onSelect } = this
    const { open } = this.state
    const value = getDay(this.props.value || this.state.value || null)
    const { disableWeekends, maxEndDate, minStartDate } = this.props
    return (
      <Wrapper>
        <TextInput
          innerRef={(el) => {if (el !== null) this.input = el}}
          onClick={openPicker}
          value={formatUsDate(value) + ' → ' + '10/10/2017'}
          paddingRight={37}
          readOnly
        />
        <IconWrapper>
          <Calendar onClick={open ? closePicker : openPicker} />
        </IconWrapper>
        <DropdownBox
          open={this.state.open}
          onClickOutside={closePicker}
          style={{ width: 280 }}
        >
          <div>
            <DatePicker
              onChange={onSelect}
              firstSelected={value}
              disableWeekends={disableWeekends}
              maxEndDate={maxEndDate}
              minStartDate={minStartDate}
            />
          </div>
        </DropdownBox>
      </Wrapper>
    )
  }
}
