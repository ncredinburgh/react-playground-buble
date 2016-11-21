import React from 'react'
import Title from '../components/title'
import { Loader, PageHeader, Button, Spacer, Modal, ModalTitle } from '../../../src'

import Playground from '../components/themed-playground'

const LoaderPage = () => (
  <div>
    <Title>Loader</Title>
    <p>Default:</p>
    <Playground
      defaultValue={
`class Launch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
    this.onShow = () => this.setState({ show: true })
    this.onHide = () => this.setState({ show: false })
  }

  render() {
    const { onShow, onHide, state } = this
    const {show} = this.state
    return (
      <div>
        <Button onClick={onShow}>Show</Button>
        <Modal
          onCancel={onHide}
          show={show}
          zIndex={2}
        >
          <ModalTitle>Are you sure?</ModalTitle>
          <Button onClick={onHide} primary>Ok</Button>
          {' '}
          <Button onClick={onHide}>Cancel</Button>
        </Modal>
      </div>
    )
  }
}

<Launch />`
      }
      scope={{ Modal, Button, ModalTitle, Spacer }}
    />
  </div>
)

export default LoaderPage
