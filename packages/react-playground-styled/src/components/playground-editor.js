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

  render() {
    const { value, blank, key } = this.state
    const { props } = this
    const {
      onChange,
      codeMirrorOptions,
      theme,
      loadTheme,
    } = props
    return (
        <Codemirror
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
