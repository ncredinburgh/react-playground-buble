import React from 'react'
import DateDropdownPrimative from './date-dropdown-primative'

const DateDropdown = ({
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
    defaultValue,
    onChange,
  }

  return (
    <DateDropdownPrimative
      {...useProps}
    />
  )
}

export default DateDropdown
