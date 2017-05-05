import React from 'react'
import Codemirror from 'react-codemirror'
import WebFont from 'webfontloader'
import codeMirrorInstance from 'codemirror'
import { injectCss } from '../util'

window.codeMirrorInstance = codeMirrorInstance

require('codemirror/mode/javascript/javascript')
require('codemirror/mode/xml/xml')
require('codemirror/mode/jsx/jsx')

const fontsLoaded = {}

export default class PlaygroundEditor extends React.Component {
  state = {
    value: this.props.defaultValue || '',
  }

  constructor(props, ctx) {
    super(props, ctx)
    this.loadCss()
  }

  loadCss = () => {
    injectCss(
      '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css'
    )

    const { loadTheme } = this.props
    if (!loadTheme) return
    injectCss(
      `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/${loadTheme}.min.css`
    )
  }

  loadFont = () => {
    const { googleFont } = this.props
    if (!googleFont) return
    if (!fontsLoaded[googleFont]) {
      let fontLoaded
      fontsLoaded[googleFont] = new Promise((resolve, reject) => {
        fontLoaded = resolve
      })
      WebFont.load({
        google: {
          families: [googleFont],
        },
        active: fontLoaded,
      })
    }
    fontsLoaded[googleFont].then(() => {
      if (this.mounted === false) return
      this.cm.refresh()
    })
  }

  onChange = value => {
    const { onChange } = this.props
    this.setState({ value })
    if (onChange) onChange(value)
  }

  componentWillUnmount() {
    this.mounted = false
    clearTimeout(this.forceRemount)
  }

  componentDidMount() {
    this.loadFont()
  }

  render() {
    const { value, blank } = this.state
    const { props } = this
    const { onChange, codeMirrorOptions, theme, loadTheme } = props
    return (
      <Codemirror
        ref={el => {
          if (el === null) return
          this.cm = el.getCodeMirror()
        }}
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
          ...(codeMirrorOptions || {}),
        }}
      />
    )
  }
}
