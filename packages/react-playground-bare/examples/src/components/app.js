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
              <pre>{errorMessage}</pre>
              <textarea {...{
                defaultValue,
                style: {width: 300, height: 100},
                onChange: e => onChange(e.target.value),
              }} />
              <div ref={onViewerMount} />
              <hr />
              <p>
                react-playground-lite is a Function as Child component.
                It supplies the follow arguments to the function child:
                <ul>
                  <li>onChange: a function that can be added to an input to be
                  used as the code editor</li>
                  <li>errorMessage: reports syntax errors in code evaluation</li>
                  <li>evalChild: vdom state for component to be inserted</li>
                  <li>onViewerMount: accepts a DOM element as an argument and
 renders the evalChild each time it updates.
                  </li>
                </ul>
                You can see the output below watch it change as you edit the JSX:
              </p>
              <Log {...{defaultValue,
              onChange,
              errorMessage,
              evalChild}} />
            </div>
          )
        }
      }
    </ReactPlaygroundBare>
  </div>
)

export default App
