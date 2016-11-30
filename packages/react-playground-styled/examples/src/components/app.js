// @flow

import React from 'react'
import { ReactPlaygroundStyled } from '../../../src'

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
    <ReactPlaygroundStyled defaultValue={defaultJsx} />
    <p>If code evaluates to JSX then it will be mounted automatically:</p>
    <ReactPlaygroundStyled defaultValue={defaultJsx} />
    <h2>Class Components</h2>
    This means a class components can be implicitly mounted by making
    the final statement evaluate to JSX:<p />
    <ReactPlaygroundStyled defaultValue={evalToJsx} />
    <h2>Eval to Jsx</h2>
    Or they can be explicitly mounted like this:<p />
    <ReactPlaygroundStyled defaultValue={defaultClass} />
    <p>backgroundColor:</p>
    <ReactPlaygroundStyled
      defaultValue={defaultJsx}
      backgroundColor={'green'}
    />
    <p>top left:</p>
    <ReactPlaygroundStyled
      defaultValue={defaultJsx}
      backgroundColor={'hotpink'}
      top left
    />
    <p>top:</p>
    <ReactPlaygroundStyled
      defaultValue={defaultJsx}
      backgroundColor={'hotpink'}
      top
    />
    <p>top:</p>
    <ReactPlaygroundStyled
      defaultValue={defaultJsx}
      backgroundColor={'hotpink'}
      bottom
      right
    />
    <p>fontFamily:</p>
    <ReactPlaygroundStyled
      defaultValue={defaultJsx}
      backgroundColor={'green'}
      fontFamily="cursive"
    />
    <p>padding:</p>
    <ReactPlaygroundStyled
      defaultValue={defaultJsx}
      backgroundColor={'green'}
      padding={35}
      top left
      editorFlex={'1 0 0'}
      viewerFlex={'1 0 0'}
    />
    <p>flex:</p>
    <ReactPlaygroundStyled
      defaultValue={defaultJsx}
      backgroundColor={'green'}
      editorFlex={2}
    />
    <p>flex:</p>
    <ReactPlaygroundStyled
      defaultValue={defaultJsx}
      backgroundColor={'green'}
      editorFlex={'none'}
      viewerFlex={'none'}
    />
  </div>
)

export default App
