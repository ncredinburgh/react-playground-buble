import React from 'react'
import { transform } from 'buble'
import ReactDOM from 'react-dom'

function evalInContext(js, context) {
  const scope = Object.keys(context)
    .map(key => `const ${key} = this.${key};\n`)
    .join('')

  return function () {
    return eval(`${scope};\n${js}`)
  }.call(context)
}

export default class PlaygroundViewer extends React.Component {
  update = ({ source, onChange }) => {
    console.log(source)
    let errorMessage
    try {
      const trans = transform(source)
      const { code } = trans
      const answer = evalInContext(code, {
        React,
        ReactDOM,
        render: ReactDOM.render,
        Component: React.Component,
        mountNode: this.el,
      })
      errorMessage = ''
      if(React.isValidElement(answer)) {
        ReactDOM.render(answer, this.el)
      }
    } catch (e) {
      errorMessage = e.message
    }
    if (!onChange) return
    onChange({
      source,
      errorMessage,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source === this.props.source) return
    this.update(nextProps)
  }

  componentDidMount() {
    this.update(this.props)
  }

  shouldComponentUpdate() { return false }

  render() {
    return (
      <div
        ref={el => {if (el !== null) this.el = el}}
        style={{
          ...this.props.style,
        }}
      />
    )
  }
}
