import React from 'react'
import Title from '../components/title'
import { PageHeader, MultiselectDropdown, DropdownButton, SelectDropdown } from '../../../src'
import * as Icons from '@di/leapfrog-icons'

import Playground from '../components/themed-playground'

const PageHeaderPage = () => (
  <div>
    <Title>PageHeader</Title>
    <Playground
      defaultValue={
`<DropdownButton>Button</DropdownButton>`
      }
      scope={{ DropdownButton }}
      top
    />
<Playground
  defaultValue={
`<SelectDropdown
  undefinedText="Select"
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
  }
  scope={{ SelectDropdown }}
  top
/>
    <p>Default:</p>
    <Playground
      defaultValue={
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
      }
      scope={{ PageHeader, MultiselectDropdown }}
      top
    />
  </div>
)

export default PageHeaderPage
