import React from 'react'
import Title from '../components/title'
import { compose } from 'recompose'
import {
  Loader,
  PageHeader,
  Button,
  Spacer,
  Modal,
  ModalTitle,
  ModalProvider,
  WithModal,
  withModal,
} from '../../../src'

import Playground from '../components/themed-playground'
import DocPage from '../components/doc-page'

const LoaderPage = () => (
  <DocPage>
    <Title>Modal</Title>
    <p>`ModalProvider` puts `pushModal` on the context. Ideally wrap this round
    the App at the root. `WithModal` can retrieve `pushModal` in deeply
    nested components. `WithModal` is a Function
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
  <WithModal>
    {ModalLauncher}
  </WithModal>
</ModalProvider>`
      }
      scope={{ Modal, Button, ModalTitle, Spacer, ModalProvider, WithModal }}
    />

    <Playground
      defaultValue={
`const ModalContent = (resolve, reject) => (
  <Button onClick={resolve}>
    Ok
  </Button>
)

let ModalLauncher = ({ pushModal }) => (
  <Button
  onClick={
    () => pushModal(ModalContent)
      .then(() => alert('ok'))
  }
  >
    Click
  </Button>
);

ModalLauncher = withModal(ModalLauncher);

<ModalProvider>
  <ModalLauncher />
</ModalProvider>`
      }
      scope={{ Modal, Button, ModalTitle, Spacer, ModalProvider, withModal }}
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
  <WithModal>
    {ModalLauncher}
  </WithModal>
</ModalProvider>`
      }
      scope={{ Modal, Button, ModalTitle, Spacer, ModalProvider, WithModal }}
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
  <WithModal>
    {ModalLauncher}
  </WithModal>
</ModalProvider>`
      }
      scope={{ Modal, Button, ModalTitle, Spacer, ModalProvider, WithModal }}
    />

  </DocPage>
)

export default LoaderPage
