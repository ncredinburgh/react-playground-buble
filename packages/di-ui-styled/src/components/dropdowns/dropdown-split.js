// @flow

import React, { Component } from 'react'
import DropdownList from './dropdown-list'
import DropdownButton from './dropdown-button'
import DropdownButtonSplit from './dropdown-button-split'

type OptionType = {
  label: string,
}

type DropdownPropsType = {
  /**
    * Options are objects which must have a label key.
    * They can have any other keys which may be used
    * by custom filters functions or onChange handlers.
    */
  options: Array<{ label: string }>,
  /*
   * make button white on gray background
   */
  onGray: boolean,
  /*
   * multiselect dropdown
   */
  multiple: boolean,
  width: number,
  noWrap: boolean,
  /*
   * show filter. defaults 'space' meaning 'and' and quotes meaning exactly
   */
  filter: boolean,
  /*
   * override filter function.
   */
  filterFn: (filterText: string) => (option: {
    label: string,
  }) => boolean,
  /*
   * array when multiple true
   */
  value: OptionType,
  /*
   * array when multiple true
   */
  defaultValue: OptionType,
  /*
   * array when multiple true
   */
  onChange: (value: OptionType | Array<OptionType>) => void,
}

const DropdownSplit = (props: DropdownPropsType) =>
  <DropdownList {...props} button={DropdownButtonSplit} />

export default DropdownSplit
