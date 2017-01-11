// @flow

import React, { Component } from 'react'
import DropdownList from './dropdown-list'
import DropdownButton from './dropdown-button'
import DropdownButtonSplit from './dropdown-button-split'

export const Dropdown = props =>
  <DropdownList {...props} button={DropdownButton} />

export const DropdownSplit = props =>
  <DropdownList {...props} button={DropdownButtonSplit} />
