import React from 'react'
import Title from '../components/title'
import { TextInput, PageHeader } from '../../../src'

import Playground from '../components/themed-playground'

const PageHeaderPage = () => (
  <div>
    <Title>TextInput</Title>
    <p>Default:</p>
    <Playground
      defaultValue={`<TextInput placeholder="name" />`}
      scope={{ TextInput }}
      fullWidth
    />
    <p>`small`:</p>
    <Playground
      defaultValue={`<TextInput small placeholder="email" type="email"/>`}
      scope={{ TextInput }}
      fullWidth
    />
    <p>`validity` can be `success`, `warning` or `error`:</p>
    <Playground
      defaultValue={
`<TextInput defaultValue="success" validity="success"/>`
      }
      scope={{ TextInput }}
      fullWidth
    />
    <Playground
      defaultValue={
`<TextInput defaultValue="warning" validity="warning"/>`
      }
      scope={{ TextInput }}
      fullWidth
    />
    <Playground
      defaultValue={
`<TextInput defaultValue="error" validity="error"/>`
      }
      scope={{ TextInput }}
      fullWidth
    />
  </div>
)

export default PageHeaderPage
