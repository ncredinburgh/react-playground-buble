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

const _forceUpdateCallbacks = []
export const forceViewerUpdate = () =>
  _forceUpdateCallbacks.forEach(fn => fn())

export default class PlaygroundViewer extends React.Component {
  update = ({ source, onChange, scope }) => {
    let errorMessage
    try {
      const trans = transform(source, {
        objectAssign: 'Object.assign',
        transforms: {
          dangerousTaggedTemplateString: true,
        },
      })
      const { code } = trans
      const answer = evalInContext(code, {
        React,
        ReactDOM,
        render: ReactDOM.render,
        Component: React.Component,
        mountNode: this.el,
        ...scope
      })
      errorMessage = ''
      if(React.isValidElement(answer)) {
        ReactDOM.unmountComponentAtNode(this.el)
        const wrapOutput = this.props.wrapOutput || (x => x)
        ReactDOM.render(
          wrapOutput(answer),
          this.el
        )
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
    _forceUpdateCallbacks.push(this.forceUpdate)
    this.update(this.props)
  }

  forceUpdate = () => {
    this.update(this.props)
  }

  componentWillUnmount() {
    _forceUpdateCallbacks
      .filter(x => x !== this.forceUpdate)
    ReactDOM.unmountComponentAtNode(this.el)
  }

  shouldComponentUpdate() { return false }

  render() {
    return (
      <div
        ref={el => {if (el !== null) this.el = el}}
        className="thisDiv"
        style={{
          ...this.props.style,
        }}
      />
    )
  }
}
