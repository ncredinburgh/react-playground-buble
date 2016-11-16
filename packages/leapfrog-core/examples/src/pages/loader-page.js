import React from 'react'
import Title from '../components/title'
import { Loader, PageHeader, Button, Spacer } from '../../../src'

import Playground from '../components/themed-playground'

const LoaderPage = () => (
  <div>
    <Title>Loader</Title>
    <p>Default:</p>
    <Playground
      defaultValue={`<Loader />`}
      scope={{ Loader }}
    />

    <p>`height`:</p>
    <Playground
      defaultValue={`<Loader height={50} />`}
      scope={{ Loader }}
    />

    <p>`small`:</p>
    <Playground
      defaultValue={`<Loader small />`}
      scope={{ Loader }}
    />
    <p>It is recommened that a user recieves feedback within 100ms of an action.
    Feedback normally means the result or a spinner. By default we `delay` the
    Spinner appearing for 100ms. You can override this with the `delay` prop. 0
    means the spinner appears on inital render. Below we have a dalay of 1 second:</p>
    <Playground
      defaultValue={
`class Wait extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  render() {
    const { show } = this.state
    const toggle = () => this.setState({ show: !show })
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        {show ? <Loader delay={1000} height={50}/> : null}
        <Spacer />
        <Button onClick={toggle}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </div>
    )
  }
}

<Wait />`
      }
      scope={{ Loader, Button, Spacer }}
    />
  </div>
)

export default LoaderPage
