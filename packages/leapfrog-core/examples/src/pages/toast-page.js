import React from 'react'
import Title from '../components/title'
import { WithToasts, Button, Toasts, Toast } from '../../../src'

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
      top left fullWidth
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
      top left fullWidth
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
      top left fullWidth
    />
    <p>
      The `WithToast` is a <a href="https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9#.im92hggs6">
        Function as Child Component
      </a> it provides `{'{'} pushToast, toasts {'}'}` to its child function. The child function should return a React Element:
    </p>
    <Playground
      defaultValue={
`const MyToaster = ({toasts, pushToast}) => (
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

<WithToasts>{MyToaster}</WithToasts>`}
      scope={{ WithToasts, Button, Toasts }}
      top left fullWidth
      wrapOutput={children => <article>{children}</article>}
    />
  </div>
)

const Comp = ({toasts, pushToast}) => (
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

({toasts, pushToast}) => (
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
)

export default PageHeaderPage
