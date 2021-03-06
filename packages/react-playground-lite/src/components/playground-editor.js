import React from 'react'
import Codemirror from 'react-codemirror'
import WebFont from 'webfontloader'
import codeMirrorInstance from 'codemirror'
import CodemirrorStyleSheet from './codemirror-style-sheet'
//import { transform } from 'buble'
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

export default class PlaygroundEditor extends React.Component {
  state = {
    value: this.props.defaultValue || '',
  }
  hash = `hash-${(Math.random().toString(10).substr(2) * 1).toString(36)}`
  static defaultProps = {
    css: CodemirrorStyleSheet,
  }

  constructor(props, ctx) {
    super(props, ctx)
    fontsLoaded.then(() => {
      setTimeout(() => this.forceUpdate(), 100)
    })
  }

  onChange = value => {
    const { onChange } = this.props
    this.setState({ value })
    if (onChange) onChange(value)
  }

  render() {
    const { value } = this.state
    const { code } = value
    const { props } = this
    const { onChange } = props
    const { hash } = this
    return (
      <div style={props.style} className={hash}>
        {props.css({ ...props, hash })}
        <Codemirror
          // ref={cm => this.cm = cm}
          value={value}
          onChange={this.onChange}
          options={{
            mode: 'jsx',
            indentWithTabs: false,
            lineNumbers: false,
            lineWrapping: true,
            smartIndent: false,
            matchBrackets: true,
            theme: 'default',
            invisibles: true,
            extraKeys: {
              Tab: cm => {
                const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
                cm.replaceSelection(spaces)
              },
            },
            codeMirrorInstance,
          }}
        />
      </div>
    )
  }
}
