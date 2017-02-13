// @flow

import React, { Component } from 'react'
import DropdownBox from '../dropdowns/dropdown-box-css-anim'
import TextInput from '../text-input'
import DatePicker from './date-picker'
import styled from 'styled-components'
import { formatUsDate, getMonth, getDay } from './date-math'
import { Calendar, Close } from '@di-internal/leapfrog-icons'
import { fromTheme } from '../../utils/theme-util'

const Wrapper = styled.div`
  width: 280px;
  display: flex;
  position: relative;
  user-select: none;
`

const CloseWrapper = styled.div`
  padding: 16px;
  margin: -16px;
  color: #666;
`

const TopRow = styled.div`
  padding: 20px;
  color: #333;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
`

const DropDownWrapper = styled.div`
  padding-bottom: 20px;
`

const InputWrapper = styled.div`
  position: relative;
`

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 12px;
  width: 18px;
  text-align: right;
  color: ${fromTheme('sectionCColor')};
  ${({ disabled }) => `opacity: ${disabled ? 0.4 : 2};`}
`

export default class DateDropdown extends Component {

  getFirstSelected = () => getDay(
    (this.props.value && this.props.value.firstSelected) ||
    (this.state && this.state.value && this.state.value.firstSelected) ||
    (this.props.defaultValue && this.props.defaultValue.firstSelected) ||
    null,
  )

  getLastSelected = () => getDay(
    (this.props.value && this.props.value.lastSelected) ||
    (this.state && this.state.value && this.state.value.lastSelected) ||
    (this.props.defaultValue && this.props.defaultValue.lastSelected) ||
    null,
  )

  state = {
    open: false,
    firstSelected: this.getFirstSelected(),
    lastSelected: this.getLastSelected(),
  }

  openPicker = () => {
    if (this.props.disabled) return
    this.closing = false
    if (this.input) this.input.focus()
    this.setState({ open: true })
  }

  closePicker = () => {
    if (this.input) this.input.blur()
    this.setState({ open: false })
  }

  onSelect = (value) => {
    const { onChange, range } = this.props
    let nextValue
    if (!range) {
      nextValue = value.firstSelected
    } else {
      if (!value.lastSelected || (value.firstSelected <= value.lastSelected)) {
        nextValue = value
      } else {
        nextValue = {
          firstSelected: value.lastSelected,
          lastSelected: value.firstSelected,
        }
      }
    }

    this.setState({ value: nextValue })
    if (onChange) {
      onChange(nextValue)
    }
    if (
      (!range && value.firstSelected) ||
      (range && value.lastSelected)
    ) {
      //this.closing = true
      //clearTimeout(this.delayClose)
      //this.delayClose = setTimeout(this.closePicker, 1500)
    }
  }

  getText = (firstSelected, lastSelected) => {
    const { range } = this.props
    if (!range) return formatUsDate(firstSelected)
    if (!firstSelected) return ''
    if (lastSelected) return `${formatUsDate(firstSelected)} → ${formatUsDate(lastSelected)}`
    return `${formatUsDate(firstSelected)} →`
  }

  componentWillUnmount() {
    clearTimeout(this.delayClose)
  }

  render() {
    const {
      openPicker,
      closePicker,
      onSelect,
      getFirstSelected,
      getLastSelected,
      getText,
    } = this
    const { open } = this.state
    const firstSelected = getFirstSelected()
    const lastSelected = getLastSelected()
    const { disableWeekends, maxEndDate, minStartDate, range, disabled } = this.props
    return (
      <Wrapper>
        <TextInput
          innerRef={(el) => {if (el !== null) this.input = el}}
          onClick={openPicker}
          value={getText(firstSelected, lastSelected)}
          paddingRight={37}
          readOnly
          disabled={disabled}
        />
        <IconWrapper disabled={disabled}>
          <Calendar onClick={open ? closePicker : openPicker} />
        </IconWrapper>
        <DropdownBox
          open={this.state.open}
          onClickOutside={closePicker}
          style={{ width: 280 }}
        >
          <DropDownWrapper>
            <TopRow>
              <div>Select date {range ? ' range' : ''}</div>
              <CloseWrapper onClick={closePicker}>
                <Close width="14" />
              </CloseWrapper>
            </TopRow>
            <DatePicker
              onChange={onSelect}
              firstSelected={firstSelected}
              lastSelected={lastSelected}
              disableWeekends={disableWeekends}
              maxEndDate={maxEndDate}
              minStartDate={minStartDate}
              range={range}
              closing={this.closing}
            />
          </DropDownWrapper>
        </DropdownBox>
      </Wrapper>
    )
  }
}
