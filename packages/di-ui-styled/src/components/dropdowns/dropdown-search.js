// @flow

import React, { Component } from 'react'
import TextInput from '../text-input'
import styled from 'styled-components'

const SearchWrapper = styled.div`
  padding: 14px;
  border-bottom: 1px solid #ccc;
`

const DropdownSearch = ({ show, onChange, value, onRef }) => show ? (
  <SearchWrapper>
    <TextInput
      innerRef={el => { if (el !== null) onRef(el) }}
      style={{ minWidth: 40 }}
      placeholder="Search"
      value={value}
      onChange={onChange}
      small
    />

  </SearchWrapper>
) : null

export default DropdownSearch
