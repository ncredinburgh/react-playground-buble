import React, { Component } from 'react'
import MultiselectDropdown from '../../src'

console.log(MultiselectDropdown)

import {
   ReactPlaygroundLite,
} from '@di/react-playground-lite'

const dropdown =
`<MultiselectDropdown
  defaultValue={['Customer ID']}
  title="Select Columns"
  options={[
    {
      label: 'Customer ID',
      value: 'Customer ID',
    },
    {
      label: 'Customer Name',
      value: 'Customer Name',
    },
    {
      label: 'Hold Date',
      value: 'Hold Date',
    },
    {
      label: 'Registration Date',
      value: 'Registration Date',
    },
  ]}
/>`


const App = () => (
  <div>
    <h2>JS</h2>

    If code evaluates to JSX then it will be mounted automatically:<p />
    <ReactPlaygroundLite
      defaultValue={dropdown}
      scope={{ MultiselectDropdown }}
    />
  </div>
)

export default App
