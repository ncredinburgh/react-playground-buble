// @flow

import React from 'react'
import DropdownListSingle from './dropdown-list-single'
import DropdownListMultiple from './dropdown-list-multiple'

const DropdownList = ({ multiple, ...props }) => multiple ?
  <DropdownListMultiple {...props}/> :
  <DropdownListSingle {...props}/>

export default DropdownList
