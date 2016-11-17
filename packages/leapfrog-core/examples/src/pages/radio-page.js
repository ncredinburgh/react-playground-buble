import React from 'react'
import Title from '../components/title'
import { PageHeader, Spacer, Radio } from '../../../src'

import Playground from '../components/themed-playground'

const RadioPage = () => (
  <div>
    <Title>Radio</Title>
    <p>Default:</p>
    <Playground
      defaultValue={`<Radio />`}
      scope={{ Radio }}
    />

    <p>`small`:</p>
    <Playground
      defaultValue={`<Radio small />`}
      scope={{ Radio }}
    />

    <p>`disabled`:</p>
    <Playground
      defaultValue={`<Radio disabled />`}
      scope={{ Radio }}
    />

    <p>With label:</p>
    <Playground
      defaultValue={
`<div>
  <Radio name="phil">Label</Radio>
  <Radio name="phil">Label</Radio>
  <Radio name="phil">Label</Radio>
</div>`}
      scope={{ Radio }}
    />

    <p>With label `before`:</p>
    <Playground
      defaultValue={`<Radio before>Label</Radio>`}
      scope={{ Radio }}
    />

    <p>`gutter` defines space between box and label:</p>
    <Playground
      defaultValue={`<Radio gutter={50}>Label</Radio>`}
      scope={{ Radio }}
    />

    <p>Uncontrolled:</p>
    <Playground
      defaultValue={`<Radio defaultChecked>Label</Radio>`}
      scope={{ Radio }}
    />

    <p>Controlled:</p>
    <Playground
      defaultValue={
`class CtrlCheck extends Component {
  constructor(props) {
    super(props)
    this.state = ({ checked: false })
    this.onChange = ({ target: { checked } }) => {
      this.setState({ checked })
    }
  }

  render() {
    return (
      <Radio
        checked={this.state.checked}
        onChange={this.onChange}
      >
        Label
      </Radio>
    )
  }
}

<CtrlCheck />`
      }
      scope={{ Radio }}
    />
  </div>
)

export default RadioPage
