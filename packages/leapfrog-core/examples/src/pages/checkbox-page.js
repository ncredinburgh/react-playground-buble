import React from 'react'
import Title from '../components/title'
import { PageHeader, Spacer, Checkbox } from '../../../src'

import Playground from '../components/themed-playground'

const CheckboxPage = () => (
  <div>
    <Title>Checkbox</Title>
    <p>Default:</p>
    <Playground
      defaultValue={`<Checkbox />`}
      scope={{ Checkbox }}
    />

    <p>`small`:</p>
    <Playground
      defaultValue={`<Checkbox small />`}
      scope={{ Checkbox }}
    />

    <p>`disabled`:</p>
    <Playground
      defaultValue={`<Checkbox disabled />`}
      scope={{ Checkbox }}
    />

    <p>With label:</p>
    <Playground
      defaultValue={`<Checkbox>Label</Checkbox>`}
      scope={{ Checkbox }}
    />

    <p>With label `before`:</p>
    <Playground
      defaultValue={`<Checkbox before>Label</Checkbox>`}
      scope={{ Checkbox }}
    />

    <p>`gutter` defines space between box and label:</p>
    <Playground
      defaultValue={`<Checkbox gutter={50}>Label</Checkbox>`}
      scope={{ Checkbox }}
    />

    <p>Uncontrolled:</p>
    <Playground
      defaultValue={`<Checkbox defaultChecked>Label</Checkbox>`}
      scope={{ Checkbox }}
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
      <Checkbox
        checked={this.state.checked}
        onChange={this.onChange}
      >
        Label
      </Checkbox>
    )
  }
}

<CtrlCheck />`
      }
      scope={{ Checkbox }}
    />
  </div>
)

export default CheckboxPage
