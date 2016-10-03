import React from 'react'
import { render } from 'react-dom'
import { transform } from 'buble'
import Codemirror from 'react-codemirror'
import WebFont from 'webfontloader'
import codeMirrorInstance from 'codemirror'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/xml/xml')
require('codemirror/mode/jsx/jsx')

let fontsResolve

const fontsLoaded = new Promise((resolve, reject) => {
  fontsResolve = resolve()
})

WebFont.load({
  google: {
    families: ['Source Sans Pro'],
  },
  active: fontsResolve,
})

function evalInContext(js, context) {
  const scope = Object.keys(context)
    .map(key => `const ${key} = this.${key};\n`)
    .join('')

  return function () {
    return eval(`${scope};\n${js}`)
  }.call(context)
}

const Error = ({ message, source }) => {
  if (!/\((\d+):(\d+)\)$/.test(message)) {
    return (
      <pre style={{color: 'red'}}>
        {message}
      </pre>
    )
  }
  const [,line, char] = message.match(/\((\d+):(\d+)\)$/)
  const lines = source.split('\n')
  let spaces = ''
  for(let i = 0; i < char - 1; i++) {
    spaces += ' '
  }
  const prevLine = lines[line - 2]
  console.log(lines)
  return (
    <pre style={{color: 'red'}}>
      {prevLine ? `${lines[line - 2]}\n` : ''}
      {`${lines[line - 1]}\n`}
      {`${spaces}^\n`}
      {message}
    </pre>
  )
}

class Docs extends React.Component {
  state = {
    value:
`class SampleClass extends React.Component {
  render() {
    return (
      <div className="Edit">
        <h2>SampleClass Component</h2>
        <p>Name: {this.props.name}</p>
        <p>Count: {this.props.count}</p>
        <p>Indexes: {this.props.indexes}</p>
        <p>Type: {this.props.multiTypeValue}</p>
      </div>
    );
  }
}`
  }

  constructor(props, ctx) {
    super(props, ctx)
    fontsLoaded.then(() => {
      setTimeout(() => this.forceUpdate(), 100)
    })
  }

  componentDidUpdate() {
    try {
      const trans = transform(this.state.value)
      const { code } = trans
      const answer = evalInContext(code, { React })
      render(answer, this.preview)
    } catch (e) {
      render(
        <Error
          source={this.state.value}
          message={e.message}
        />,
        this.preview
      )
    }
  }

  componentDidMount() {
    const cm = this.cm.getCodeMirror()
    const Maximum = 16
    cm.addOverlay({
      name: 'invisibles',
      token: stream => {
        let ret
        let spaces = 0
        let peek = stream.peek() === ' '

        if (peek) {
          while (peek && spaces < Maximum) {
            ++spaces
            stream.next()
            peek = stream.peek() === ' '
          }
          ret = `whitespace whitespace-${spaces}`
        } else {
          while (!stream.eol() && !peek) {
            stream.next()
            peek = stream.peek() === ' '
          }
          ret = 'cm-eol'
        }
        return ret
      },
    })
  }

  render() {
    const { value } = this.state
    const { code } = value
    return (
      <div ref={el => { if (el !== null) this.el = el }}>
        <h1>Hello</h1>
        <p>Hello people</p>
        {/* <pre>{JSON.stringify(this.state.value)}</pre> */}
        <div ref={el => { if (el !== null) this.preview = el }}/>
        <Codemirror
          ref={cm => this.cm = cm}
          // className="CodeMirror cm-s-monokai CodeMirror-wrap"
          style={{padding: 20}}
          value={value}
          onChange={value => this.setState({value})}
          options={{
            mode: "jsx",
            lineNumbers: false,
            lineWrapping: true,
            smartIndent: false,
            matchBrackets: true,
            theme: 'night',
            invisibles: true,
            codeMirrorInstance,
          }}
        />
      </div>
    )
  }
}

render(
  <Docs />,
  document.getElementById('root')
)
