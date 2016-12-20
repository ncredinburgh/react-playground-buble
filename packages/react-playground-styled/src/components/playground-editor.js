import React from 'react'
import Codemirror from 'react-codemirror'
import WebFont from 'webfontloader'
import codeMirrorInstance from 'codemirror'
import { injectCss } from '../util'

require('codemirror/mode/javascript/javascript')
require('codemirror/mode/xml/xml')
require('codemirror/mode/jsx/jsx')

const fontsLoaded = {}

export default class PlaygroundEditor extends React.Component {
  state = {
    value: this.props.defaultValue || '',
    key: 0,
  }

  constructor(props, ctx) {
    super(props, ctx)
    this.loadCss()
    this.loadFont()
  }

  loadCss = () => {
    injectCss('//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css')

    const { loadTheme } = this.props
    if (!loadTheme) return
    injectCss(`//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/${loadTheme}.min.css`)
  }

  loadFont = () => {
    const { loadFont } = this.props
    if (!loadFont) return
    if (!fontsLoaded[loadFont]) {
      let fontLoaded
      fontsLoaded[loadFont] = new Promise((resolve, reject) => {
        fontLoaded = resolve
      })
      WebFont.load({
        google: {
          families: ['Source Sans Pro'],
        },
        active: fontLoaded,
      })
    }
    fontsLoaded[loadFont].then(() => {
      this.forceRemount = setTimeout(this.setState({ key: 1 }))
    })
  }

  onChange = value => {
    const { onChange } = this.props
    this.setState({value})
    if (onChange) onChange(value)
  }

  componentWillUnmount() {
    clearTimeout(this.forceRemount)
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
    const { value, blank, key } = this.state
    const { props } = this
    const {
      onChange,
      codeMirrorOptions,
      theme,
      loadTheme,
    } = props
    //console.log(theme || loadTheme || 'default')
    return (
        <Codemirror
          // ref={cm => this.cm = cm}
          key={key}
          value={value}
          onChange={this.onChange}
          options={{
            mode: 'jsx',
            indentWithTabs: false,
            lineNumbers: false,
            lineWrapping: true,
            smartIndent: false,
            matchBrackets: true,
            theme: theme || loadTheme || 'default',
            invisibles: true,
            extraKeys: {
              Tab: cm => {
                const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
                cm.replaceSelection(spaces)
              },
            },
            codeMirrorInstance,
            ...(codeMirrorOptions || {})
          }}
        />

    )
  }
}
