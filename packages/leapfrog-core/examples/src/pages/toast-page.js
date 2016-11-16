import React from 'react'
import Title from '../components/title'
import { withToasts, Button, Toasts, Toast } from '../../../src'

import Playground from '../components/themed-playground'

const PageHeaderPage = () => (
  <div>
    <Title>Toasts</Title>
    <p>Default `Toast` is of `type` `message`:</p>
    <Playground
      defaultValue={
`<Toast>message</Toast>`
      }
      scope={{ Toast }}
      top left
      viewerStyle={{width: '100%'}}
    />
    <p>Other `type`s:</p>
    <Playground
      defaultValue={
`<div>
  <Toast type="success">success</Toast>
  <Toast type="danger">danger</Toast>
  <Toast type="warning">warning</Toast>
  <Toast type="info">info</Toast>
</div>`
      }
      scope={{ Toast }}
      top left
      viewerStyle={{width: '100%'}}
    />
    <p>`icon` adds and icon:</p>
    <Playground
      defaultValue={
`<div>
  <Toast type="success" icon>success</Toast>
  <Toast type="danger" icon>danger</Toast>
  <Toast type="warning" icon>warning</Toast>
  <Toast type="info" icon>info</Toast>
</div>`
      }
      scope={{ Toast }}
      top left
      viewerStyle={{width: '100%'}}
    />
    <p>
      The `withToast` higher order component provides `pushToast` & `toasts` to a component as `props`:
    </p>
    <Playground
      defaultValue={
`let Comp = ({toasts, pushToast}) => (
  <div>
    <Toasts toasts={toasts} />
    <Button onClick={() => pushToast({
      children: <div>Hello <a href="#">link</a></div>,
      type: 'success',
      icon: true,
    })}>
      Click x3
    </Button>
  </div>
);

Comp = withToasts(3000)(Comp);

<Comp />`}
      scope={{ withToasts, Button, Toasts }}
      top left
      viewerStyle={{width: '100%'}}
      wrapOutput={children => <article>{children}</article>}
    />
  </div>
)

export default PageHeaderPage
