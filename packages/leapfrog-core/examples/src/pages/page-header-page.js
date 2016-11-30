import React from 'react'
import Title from '../components/title'
import { Caret, PageHeader } from '../../../src'

import Playground from '../components/themed-playground'

const PageHeaderPage = () => (
  <div>
    <Title>PageHeader</Title>
    <p>Default:</p>
    <Playground
      defaultValue={`<PageHeader title="Hello World" />`}
      scope={{ PageHeader }}
      top left fullWidth
    />
    <p>Add content in line with header on right side of page:</p>
    <Playground
      defaultValue={
`<PageHeader title="Hello World">
  Right Content
</PageHeader>`
      }
      scope={{ PageHeader }}
      top left fullWidth
    />
    <p>
      Stretch line edge to edge by compensating for outer padding. Only do
      this if container and heading have a common source of truth for this value:
    </p>
    <Playground
      defaultValue={
`<PageHeader
  title="Hello World"
  padding={12}
  margin={-12}
>
  Right Content
</PageHeader>`
      }
      scope={{ PageHeader }}
      top left fullWidth
    />
  </div>
)

export default PageHeaderPage
