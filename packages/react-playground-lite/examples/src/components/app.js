// @flow

import React from 'react'
import {
  ReactPlaygroundLite,
  WithPlayground,
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

const Log = ({defaultValue,
  onChange,
  errorMessage,
  evalChild,
}) => (
  <pre>
  {
    JSON.stringify({
      defaultValue,
      onChange,
      errorMessage,
      evalChild,
    },0,2)
  }
  </pre>
)


const App = () => (
  <div>
    <h2>JSX</h2>
    <WithPlayground
      defaultValue={defaultJsx}
    >
      {
        ({
          defaultValue,
          onChange,
          errorMessage,
          evalChild,
        }) => {
          return (
            <div>
              <Log {...{defaultValue,
              onChange,
              errorMessage,
              evalChild}} />
              <pre>{errorMessage}</pre>
              <textarea {...{
                defaultValue,
                style: {width: 300, height: 100},
                onChange: e => onChange(e.target.value),
              }} />
              {evalChild}
            </div>
          )
        }
      }
    </WithPlayground>
    If code evaluates to JSX then it will be mounted automatically:<p />
    <ReactPlaygroundLite defaultValue={defaultJsx} />
    <h2>Class Components</h2>
    This means a class components can be implicitly mounted by making
    the final statement evaluate to JSX:<p />
    <ReactPlaygroundLite defaultValue={evalToJsx} />
    <h2>Eval to Jsx</h2>
    Or they can be explicitly mounted like this:<p />
    <ReactPlaygroundLite defaultValue={defaultClass} />
    <p>backgroundColor:</p>
    <ReactPlaygroundLite
      defaultValue={defaultJsx}
      backgroundColor={'green'}
    />
    <p>top left:</p>
    <ReactPlaygroundLite
      defaultValue={defaultJsx}
      backgroundColor={'hotpink'}
      top left
    />
    <p>top:</p>
    <ReactPlaygroundLite
      defaultValue={defaultJsx}
      backgroundColor={'hotpink'}
      top
    />
    <p>top:</p>
    <ReactPlaygroundLite
      defaultValue={defaultJsx}
      backgroundColor={'hotpink'}
      bottom
      right
    />
    <p>fontFamily:</p>
    <ReactPlaygroundLite
      defaultValue={defaultJsx}
      backgroundColor={'green'}
      fontFamily="cursive"
    />
    <p>padding:</p>
    <ReactPlaygroundLite
      defaultValue={defaultJsx}
      backgroundColor={'green'}
      padding={35}
      top left
      editorFlex={'1 0 0'}
      viewerFlex={'1 0 0'}
    />
    <p>flex:</p>
    <ReactPlaygroundLite
      defaultValue={defaultJsx}
      backgroundColor={'green'}
      editorFlex={2}
    />
    <p>flex:</p>
    <ReactPlaygroundLite
      defaultValue={defaultJsx}
      backgroundColor={'green'}
      editorFlex={'none'}
      viewerFlex={'none'}
    />
  </div>
)

export default App
