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
      defaultValue={`<Checkbox value="2">Label</Checkbox>`}
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

    <p>Vertical by default:</p>
    <Playground
      defaultValue={
`<div>
  <Checkbox value="1">One</Checkbox>
  <Checkbox value="2">Two</Checkbox>
  <Checkbox value="3">Three</Checkbox>
</div>`
      }
      scope={{ Checkbox }}
    />

    <p>`inline`:</p>
    <Playground
      defaultValue={
`<div>
  <Checkbox value="1" inline>One</Checkbox>
  <Checkbox value="2" inline>Two</Checkbox>
  <Checkbox value="3" inline>Three</Checkbox>
</div>`
      }
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
    this.state = ({ checked: {} })
    this.onCheck = id => ({ target }) => {
      const clone = { ...this.state.checked }
      clone[id] = target.checked
      this.setState({
        checked: clone
      })
    }
  }

  render() {
    const { checked } = this.state
    const { onCheck } = this
    return (
      <div>
        <Checkbox
          checked={checked[1]}
          onChange={onCheck(1)}
        >
          One
        </Checkbox>
        <Checkbox
          checked={checked[2]}
          onChange={onCheck(2)}
        >
          Two
        </Checkbox>
        Selected:
        {
          Object.keys(checked).sort()
            .filter(id => checked[id]).join(', ')
        }
      </div>
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
