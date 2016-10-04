// @flow

import React from 'react'
import {
  ReactPlaygroundLite,
} from '../../../src'

const defaultJsx = `<div className="Edit">
  <button>Hello</button>
</div>`

const defaultClass =
`class MyComponent extends React.Component {
  render() {
    return (
      <div className="Edit">
        <button>Hello</button>
      </div>
    )
  }
}

ReactDOM.render(<MyComponent />, mountNode)`

const evalToJsx =
`class MyComponent extends Component {
  render() {
    return (
      <div className="Edit">
        <button>Hello</button>
      </div>
    )
  }
}

<MyComponent />`


const App = () => (
  <div>
    <h2>JSX</h2>
    If code evaluates to JSX then it will be mounted automatically:<p />
    <ReactPlaygroundLite defaultValue={defaultJsx} />
    <h2>Class Components</h2>
    This means a class components can be implicitly mounted by making
    the final statement evaluate to JSX:<p />
    <ReactPlaygroundLite defaultValue={evalToJsx} />
    <h2>Eval to Jsx</h2>
    Or they can be explicitly mounted like this:<p />
    <ReactPlaygroundLite defaultValue={defaultClass} />
  </div>
)

export default App
