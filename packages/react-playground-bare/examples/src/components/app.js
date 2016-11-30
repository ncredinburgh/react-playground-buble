// @flow

import React from 'react'
import ReactPlaygroundBare from '../../../src'

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
    <ReactPlaygroundBare
      defaultValue={defaultJsx}
    >
      {
        ({
          defaultValue,
          onChange,
          errorMessage,
          evalChild,
          onViewerMount
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
              <div ref={onViewerMount} />
            </div>
          )
        }
      }
    </ReactPlaygroundBare>
  </div>
)

export default App
