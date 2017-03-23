// @flow

import React from 'react'
import DateDropdownPrimative from './date-dropdown-primative'

type DateRangeType = {
  firstSelected: Date,
  lastSelected: Date,
}

type DateDropdownPropsType = {
  /**
    * Disable weekends
    */
  disableWeekends: boolean,
  small: boolean,
  autoFocus: boolean,
  autoClose: boolean,
  /**
    * Dates after disabled
    */
  maxEndDate: Date,
  /**
    * Dates before disabled
    */
  minStartDate: Date,
  /**
    * Disable dropdown
    */
  disabled: boolean,
  /**
    * Use for uncontrolled component
    */
  defaultValue: Date,
  /**
    * Use for controlled component
    */
  value: string,
  onChange: (value: Date) => void,
}

/**
  * Date picker for single dates
  */
function DateDropdown({
  disableWeekends,
  maxEndDate,
  minStartDate,
  disabled,
  defaultValue,
  value,
  onChange,
  small,
  autoFocus,
  autoClose,
}: DateDropdownPropsType) {
  const useProps = {
    disableWeekends,
    maxEndDate,
    minStartDate,
    disabled: !!disabled,
    value,
    defaultValue,
    onChange,
    small,
    autoFocus,
    autoClose,
  }

  return (
    <DateDropdownPrimative
      {...useProps}
    />
  )
}

export default DateDropdown
