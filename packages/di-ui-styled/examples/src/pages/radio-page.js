import React from 'react'
import Title from '../components/title'
import { PageHeader, Spacer, Radio } from '../../../src'

import Playground from '../components/themed-playground'
import DocPage from '../components/doc-page'

const RadioPage = () => (
  <DocPage>
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
      defaultValue={`<Radio>Label</Radio>`}
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

    <p>Vertical stacking by default. Note `name` group radios making them
    mutually exclusive:</p>
    <Playground
      defaultValue={
`<div>
  <Radio name="group1" value="1">One</Radio>
  <Radio name="group1" value="2">Two</Radio>
  <Radio name="group1" value="3">Three</Radio>
</div>`
      }
      scope={{ Radio }}
    />

    <p>`inline`:</p>
    <Playground
      defaultValue={
`<div>
  <Radio name="group2" value="1" inline>One</Radio>
  <Radio name="group2" value="2" inline>Two</Radio>
  <Radio name="group2" value="3" inline>Three</Radio>
</div>`
      }
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
    this.state = { checked: undefined }
    this.onCheck = n => () => {
      this.setState({ checked: n })
    }
  }

  render() {
    const { checked } = this.state
    return (
      <div>
        <Radio
          checked={checked == 1}
          onChange={this.onCheck(1)}
        >
          One
        </Radio>
        <Radio
          checked={checked == 2}
          onChange={this.onCheck(2)}
        >
          Two
        </Radio>
        Checked: {checked}
      </div>
    )
  }
}

<CtrlCheck />`
      }
      scope={{ Radio }}
    />
  </DocPage>
)

export default RadioPage
