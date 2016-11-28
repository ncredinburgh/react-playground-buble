import React from 'react'
import { transform } from 'buble'
import ReactDOM from 'react-dom'
import 'isomorphic-fetch'

function evalInContext(js, context) {
  const scope = Object.keys(context)
    .map(key => `var ${key} = this.${key};\n`)
    .join('')

  return function () {
    return eval(`${scope};\n${js}`)
  }.call(context)
}

const _forceUpdateCallbacks = []
export const forceViewerUpdate = () =>
  _forceUpdateCallbacks.forEach(fn => fn())

export default class PlaygroundViewer extends React.Component {
  remoteCompile = source => fetch('/eval', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ source }),
  })
  .then(res => res.json())
  .then(({ transpiled, errorMessage }) => {
    if (errorMessage !== '') throw new Error(errorMessage)
    return transpiled
  })

  localCompile = source => new Promise((resolve, reject) => {
    const trans = transform(source, {
      objectAssign: 'Object.assign',
      transforms: {
        dangerousTaggedTemplateString: true,
      },
    })
    resolve(trans.code)
  })

  renderDom = scope => transpiled => new Promise((resolve, reject) => {
    const answer = evalInContext(transpiled, {
      React,
      ReactDOM,
      render: ReactDOM.render,
      Component: React.Component,
      mountNode: this.el,
      ...scope
    })

    if (React.isValidElement(answer)) {
      ReactDOM.unmountComponentAtNode(this.el)
      const wrapOutput = this.props.wrapOutput || (x => x)
      ReactDOM.render(
        wrapOutput(answer),
        this.el
      )
    }
    resolve(true)
  })

  update = ({
    source,
    onChange,
    scope
  }) => {
    const after = ({ message } = {}) => {
      if (!onChange) return
      onChange({
        source,
        errorMessage: message,
      })
    }
    
    this.remoteCompile(source)
      .then(this.renderDom(scope))
      .then(after)
      .catch(after)

    // try {
    //   const answer = evalInContext(transpiled, {
    //     React,
    //     ReactDOM,
    //     render: ReactDOM.render,
    //     Component: React.Component,
    //     mountNode: this.el,
    //     ...scope
    //   })
    //
    //   if (React.isValidElement(answer)) {
    //     ReactDOM.unmountComponentAtNode(this.el)
    //     const wrapOutput = this.props.wrapOutput || (x => x)
    //     ReactDOM.render(
    //       wrapOutput(answer),
    //       this.el
    //     )
    //   }
    // } catch (e) {
    //   errorMessage = e.message
    // }
    // if (!onChange) return
    // onChange({
    //   source,
    //   errorMessage,
    // })
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
