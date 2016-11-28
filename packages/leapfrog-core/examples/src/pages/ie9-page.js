import React from 'react'
import Title from '../components/title'
import { Button, PageHeader, ToggleSwitch, Modal, Radio, ModalTitle } from '../../../src'
import styled from 'styled-components'

const MyButton = styled(Button)`
  borderRadius: 20px;`
const ButtonLink = Button.factory('a')

class Launch extends React.Component {
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

const ButtonPage = () => (
  <div>
    <PageHeader title="Buttons" />
    <Button>Click</Button>
    <Button primary>Click</Button>
    <Button tertiary>Click</Button>
    <Button onGray>Click</Button>
    <Button disabled>Click</Button>
    <ButtonLink href="#">
      Click
    </ButtonLink>
    <div>
      <Button.A href="#">Click</Button.A>{' '}
      <Button.Div>Click</Button.Div>{' '}
      <Button.Span>Click</Button.Span>{' '}
      <Button.Li>Click</Button.Li>
    </div>

    <MyButton>Click</MyButton>

    <div style={{ display: 'flex', width: '100%' }}>
      <Button flex margin="0 2px">Cancel</Button>
      <Button flex primary margin="0 2px">OK</Button>
    </div>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%' }}>
      <Button flex margin="2px 0">One</Button>
      <Button flex margin="2px 0">Two</Button>
      <Button flex margin="2px 0">Three</Button>
    </div>

    <Button.Div block>Block</Button.Div>
    <PageHeader title="Toggle" />
    <ToggleSwitch />
    <PageHeader title="Radio" />
    <div>
      <Radio name="group1" value="1">One</Radio>
      <Radio name="group1" value="2">Two</Radio>
      <Radio name="group1" value="3">Three</Radio>
    </div>
    <div>
      <Radio name="group2" value="1" inline>One</Radio>
      <Radio name="group2" value="2" inline>Two</Radio>
      <Radio name="group2" value="3" inline>Three</Radio>
    </div>
    <Launch />
  </div>
)

export default ButtonPage
