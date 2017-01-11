import React from 'react'
import Title from '../components/title'
import {
  PageHeader,
  Dropdown,
  DropdownSplit,
  DropdownButton,
  DropdownButtonSplit,
} from '../../../src'
import * as Icons from '@di/leapfrog-icons'

import Playground from '../components/themed-playground'

const PageHeaderPage = () => (
  <div>
    <Title>PageHeader</Title>
    <Playground
      defaultValue={
    `<DropdownButtonSplit>Button</DropdownButtonSplit>`
      }
      scope={{ DropdownButtonSplit }}
      top
    />
<p>Dropdown allowing only one item to be selected at a time:</p>
<Playground
  defaultValue={
`<Dropdown
  title="Select"
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
  scope={{ Dropdown, DropdownSplit }}
  top
/>
<p>Dropdown can be filtered:</p>
<Playground
  defaultValue={
`<Dropdown
  title="Select"
  filter
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
  scope={{ Dropdown, DropdownSplit }}
  top
/>
    <p>Default:</p>
    <Playground
      defaultValue={
`<Dropdown
  multiple
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
      scope={{ Dropdown, DropdownSplit }}
      top
    />
    <Playground
      defaultValue={
    `<DropdownButton>Button</DropdownButton>`
      }
      scope={{ DropdownButton }}
      top
    />
  </div>
)

export default PageHeaderPage
