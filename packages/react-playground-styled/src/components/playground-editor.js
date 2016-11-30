import React from 'react'
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

export default class PlaygroundEditor extends React.Component {
  state = {
    value: this.props.defaultValue || ''
  }

  constructor(props, ctx) {
    super(props, ctx)
    fontsLoaded.then(() => {
      setTimeout(() => this.forceUpdate(), 100)
    })
  }

  onChange = value => {
    const { onChange } = this.props
    this.setState({value})
    if (onChange) onChange(value)
  }

  // componentDidMount() {
  //   const cm = this.cm.getCodeMirror()
  //   const Maximum = 16
  //   cm.addOverlay({
  //     name: 'invisibles',
  //     token: stream => {
  //       let ret
  //       let spaces = 0
  //       let peek = stream.peek() === ' '
  //
  //       if (peek) {
  //         while (peek && spaces < Maximum) {
  //           ++spaces
  //           stream.next()
  //           peek = stream.peek() === ' '
  //         }
  //         ret = `whitespace whitespace-${spaces}`
  //       } else {
  //         while (!stream.eol() && !peek) {
  //           stream.next()
  //           peek = stream.peek() === ' '
  //         }
  //         ret = 'cm-eol'
  //       }
  //       return ret
  //     },
  //   })
  // }
  render() {
    const { value } = this.state
    const { code } = value
    const { props } = this
    const { onChange } = props
    return (
      <div style={props.style}>

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
              Tab: (cm) => {
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
