import React from 'react'
import Title from '../components/title'
import {
  Loader,
  PageHeader,
  Button,
  Spacer,
  Modal,
  ModalTitle,
  ModalProvider,
  WithPushModal,
} from '../../../src'

import Playground from '../components/themed-playground'

const LoaderPage = () => (
  <div>
    <Title>Loader</Title>
    <p>`ModalProvider` puts `pushModal` on the context. Ideally wrap this round
    the App at the root. `WithPushModal` can retrieve `pushModal` in deeply
    nested components. `WithPushModal` is a Function
    as Child component. It provides `pushModal` as an argument to the children
    function. `pushModal` has the same signature as a new promise, it returns a
    promise and provides `reject` and `resolve` as arguments to the function
    passed in. This function should then return the content to be rendered in
    the modal:</p>
    <Playground
      defaultValue={
`
const ModalContent = (resolve, reject) => (
  <Button onClick={resolve}>
    Ok
  </Button>
)

const ModalLauncher = pushModal => (
  <Button
    onClick={
      () => pushModal(ModalContent)
        .then(() => alert('ok'))
    }
  >
    Click
  </Button>
);

<ModalProvider>
  <WithPushModal>
    {ModalLauncher}
  </WithPushModal>
</ModalProvider>`
      }
      scope={{ Modal, Button, ModalTitle, Spacer, ModalProvider, WithPushModal }}
    />
    <p>Modals are often related to async behaviour. This means a modal may
    be triggered while another modal is showing. For this reason we queue
    modals to appear one at a time in the order they were triggered.
    </p>
    <Playground
      defaultValue={
`
const ModalContent = n => (resolve, reject) => (
  <Button onClick={resolve}>
    Ok {n}
  </Button>
)

const ModalLauncher = pushModal => (
  <Button
    onClick={
      () => {
        pushModal(ModalContent(1))
        pushModal(ModalContent(2))
        pushModal(ModalContent(3))
      }
    }
  >
    Three modals
  </Button>
);

<ModalProvider>
  <WithPushModal>
    {ModalLauncher}
  </WithPushModal>
</ModalProvider>`
      }
      scope={{ Modal, Button, ModalTitle, Spacer, ModalProvider, WithPushModal }}
    />
    <p>The promise API helps manage async behaviour:</p>
    <Playground
      defaultValue={
`
const ModalContent = (resolve, reject) => (
  <div>
    <ModalTitle>Delete</ModalTitle>
    <p>Are you sure?</p>
    <Button
      primary
      onClick={() => resolve('Item deleted')}
    >
      Ok
    </Button>
    {' '}
    <Button
      onClick={() => reject('Canceled')}
    >
      Cancel
    </Button>
  </div>
)

const ModalLauncher = pushModal => (
  <Button
    onClick={
      () => pushModal(ModalContent)
        .then(alert)
        .catch(alert)
    }
  >
    Delete
  </Button>
);

<ModalProvider>
  <WithPushModal>
    {ModalLauncher}
  </WithPushModal>
</ModalProvider>`
      }
      scope={{ Modal, Button, ModalTitle, Spacer, ModalProvider, WithPushModal }}
    />

  </div>
)

export default LoaderPage
