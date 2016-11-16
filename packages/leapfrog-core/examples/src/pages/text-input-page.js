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
      top left
      viewerStyle={{width: '100%'}}
      wrapOutput={children => <article>{children}</article>}
    />
    <p>`small`:</p>
    <Playground
      defaultValue={`<TextInput small placeholder="email" type="email"/>`}
      scope={{ TextInput }}
      top left
      viewerStyle={{width: '100%'}}
      wrapOutput={children => <article>{children}</article>}
    />
    <p>`validity` can be `success`, `warning` or `error`:</p>
    <Playground
      defaultValue={
`<TextInput defaultValue="success" validity="success"/>`
      }
      scope={{ TextInput }}
      top left
      viewerStyle={{width: '100%'}}
      wrapOutput={children => <article>{children}</article>}
    />
    <Playground
      defaultValue={
`<TextInput defaultValue="warning" validity="warning"/>`
      }
      scope={{ TextInput }}
      top left
      viewerStyle={{width: '100%'}}
      wrapOutput={children => <article>{children}</article>}
    />
    <Playground
      defaultValue={
`<TextInput defaultValue="error" validity="error"/>`
      }
      scope={{ TextInput }}
      top left
      viewerStyle={{width: '100%'}}
      wrapOutput={children => <article>{children}</article>}
    />
  </div>
)

export default PageHeaderPage
