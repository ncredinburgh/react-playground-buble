import React from 'react'
import Title from '../components/title'
import { PageHeader, MultiselectDropdown } from '../../../src'
import * as Icons from '@di/leapfrog-icons'

import Playground from '../components/themed-playground'

const PageHeaderPage = () => (
  <div>
    <Title>PageHeader</Title>
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
      top left
      viewerStyle={{width: '100%'}}
      wrapOutput={children => <article>{children}</article>}
    />
  </div>
)

export default PageHeaderPage
