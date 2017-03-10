// @flow

import React, { Component } from 'react'
import DropdownList from './dropdown-list'
import DropdownButton from './dropdown-button'
import DropdownButtonSplit from './dropdown-button-split'

type OptionType = {
  label: string,
}

type DropdownPropsType = {
  options: Array<{ label: string }>,
  /**
   * make button white on gray background
   */
  onGray: boolean,
  /**
   * multiselect dropdown
   */
  multiple: boolean,
  title: string,
  lockTitle: boolean,
  width: number,
  noWrap: boolean,
  /**
   * show filter
   */
  filter: boolean,
  /**
   * override filter function.
   */
  filterFn: (filterText: string) => (option: {
    label: string,
  }) => boolean,
  /*
   * array when multiple true
   */
  value: OptionType | Array<OptionType>,
  /*
   * array when multiple true
   */
  defaultValue: OptionType | Array<OptionType>,
  /*
   * array when multiple true
   */
  onChange: (value: OptionType | Array<OptionType>) => void,
}


const Dropdown = (props: DropdownPropsType) =>
  <DropdownList {...props} button={DropdownButton} />

export default Dropdown
