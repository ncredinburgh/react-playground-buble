// @flow

import React from 'react'
import DateDropdownPrimative from './date-dropdown-primative'


type DateRangeType = {
  /**
  * yyyy-mm-dd
  */
  firstSelected: string,
  /**
  * yyyy-mm-dd
  */
  lastSelected: string,
}

type DateRangeDropdownPropsType = {
  disableWeekends?: boolean,
  /**
  * Dates before disabled
  */
  minStartDate?: Date,
  small: boolean,
  autoFocus: boolean,
  autoClose: boolean,
  /**
    * Dates after disabled
    */
  maxEndDate?: Date,
  /**
    * Disable dropdown
    */
  disabled?: boolean,
  /**
    * Use for uncontrolled component
    */
  defaultValue?: DateRangeType,
  /**
    * Use for controlled component
    */
  value: DateRangeType,
  onChange: (value: Date) => ({
    firstSelected: Date,
    lastSelected: Date,
  }),
}

function DateRangeDropdown({
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
}: DateRangeDropdownPropsType) {
  const useProps = {
    disableWeekends,
    maxEndDate,
    minStartDate,
    disabled: !!disabled,
    value,
    range: true,
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

export default DateRangeDropdown
