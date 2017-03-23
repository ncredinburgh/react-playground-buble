// @flow

import React, { Component } from 'react'
import DropdownBox from '../dropdowns/dropdown-box-css-anim'
import TextInput from '../text-input'
import DatePicker from './date-picker'
import styled from 'styled-components'
import { formatUsDate, getDay } from './date-math'
import { Calendar, Close, Delete } from '@di-internal/di-ui-icon-elements'
import { fromTheme } from '../../utils/theme-util'
import { fromIso } from './date-math'

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
  top: ${({ small }) => small ? 8 : 12}px;
  width: 18px;
  text-align: right;
  color: ${fromTheme('sectionCColor')};
  ${({ disabled }) => `opacity: ${disabled ? 0.4 : 2};`}
`

const ClearWrapper = styled.div`
  position: absolute;
  right: 37px;
  top: ${({ small }) => small ? 8 : 12}px;
  width: 18px;
  text-align: right;
  color: ${fromTheme('sectionCColor')};
  ${({ disabled }) => `opacity: ${disabled ? 0.4 : 2};`}
`

export default class DateDropdown extends Component {

  getStart = () => getDay(
    (typeof this.props.value === 'string' && this.props.value) ||
    (this.props.value && this.props.value.start) ||
    (this.state && this.state.value && this.state.value.start) ||
    (this.prestine && typeof this.props.defaultValue === 'string' && this.props.defaultValue) ||
    (this.prestine && this.props.defaultValue && this.props.defaultValue.start) ||
    null,
  )

  getEnd = () => getDay(
    (this.props.value && this.props.value.end) ||
    (this.state && this.state.value && this.state.value.end) ||
    (this.prestine && this.props.defaultValue && this.props.defaultValue.end) ||
    null,
  )
  prestine = true

  state = {
    open: false,
    start: this.getStart(),
    end: this.getEnd(),
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

  onClear = () => {
    const { range } = this.props
    this.onSelect(range ? {
      firstSelected: null,
      lastSelected: null,
    } : null)
  }

  onSelect = (value) => {
    const { onChange, range, autoClose } = this.props
    this.prestine = false
    this.setState(
      range ?
        {
          value:
          {
            start: value.firstSelected,
            end: value.lastSelected,
          }
        } :
        { value: { start: value } }
      )

    if (onChange) {
      if (range) {
        onChange({
          start: value.firstSelected,
          end: value.lastSelected,
        })
      } else {
        onChange(value)
      }
    }

    if (
      autoClose && (
        !range ||
        (range && value.firstSelected && value.lastSelected)
      )
    ) {
      this.delayClose = setTimeout(this.closePicker, 200)
    }
  }

  getText = (start, end) => {
    const { range } = this.props
    if (!range) return formatUsDate(start)
    if (!start) return ''
    if (end) return `${formatUsDate(start)} → ${formatUsDate(end)}`
    return `${formatUsDate(start)} →`
  }

  componentWillUnmount() {
    clearTimeout(this.delayClose)
  }

  render() {
    const {
      openPicker,
      closePicker,
      onSelect,
      getStart,
      getEnd,
      getText,
    } = this
    const { open } = this.state
    const start = getStart()
    const end = getEnd()
    const { disableWeekends, maxEndDate, minStartDate, range, disabled } = this.props
    const text = getText(start, end)
    return (
      <Wrapper>
        <TextInput
          innerRef={(el) => {if (el !== null) this.input = el}}
          onClick={openPicker}
          value={text}
          paddingRight={37}
          readOnly
          disabled={disabled}
          small={this.props.small}
          autoFocus={this.props.autoFocus}
        />
        <IconWrapper
          disabled={disabled}
          small={this.props.small}
        >
          <Calendar onClick={open ? closePicker : openPicker} />
        </IconWrapper>
        {
          text ? (
            <ClearWrapper
              disabled={disabled}
              small={this.props.small}
            >
              <Delete onClick={this.onClear} />
            </ClearWrapper>
          ) : null
        }
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
              firstSelected={start}
              lastSelected={end}
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
