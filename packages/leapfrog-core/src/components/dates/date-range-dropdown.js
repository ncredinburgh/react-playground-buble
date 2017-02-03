// @flow

import React from 'react'
import DateDropdownPrimative from './date-dropdown-primative'


type DateRangeType = {
  firstSelected: Date,
  lastSelected: Date,
}

type DateRangeDropdownPropsType = {
  disableWeekends?: boolean,
  /**
  * Dates before disabled
  */
  minStartDate?: Date,
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
  }

  return (
    <DateDropdownPrimative
      {...useProps}
    />
  )
}

export default DateRangeDropdown
