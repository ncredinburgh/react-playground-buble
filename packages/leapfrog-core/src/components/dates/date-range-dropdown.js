import React from 'react'
import DateDropdownPrimative from './date-dropdown-primative'

const DateRangeDropdown = ({
  disableWeekends,
  maxEndDate,
  minStartDate,
  disabled,
  defaultValue,
  value,
  onChange,
}) => {

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
