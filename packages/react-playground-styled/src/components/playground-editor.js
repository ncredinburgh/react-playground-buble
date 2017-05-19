import React from 'react'
import Codemirror from 'react-codemirror'
import WebFont from 'webfontloader'
import codeMirrorInstance from 'codemirror'
import { injectCss } from '../util'

// window.codeMirrorInstance = codeMirrorInstance
// window.React = React
import 'codemirror/mode/javascript/javascript'
// import 'codemirror/mode/xml/xml'
import 'codemirror/mode/jsx/jsx'

// import 'codemirror/mode/jsx/jsx'
import 'codemirror/keymap/sublime'
import 'codemirror/addon/fold/xml-fold' // Needed to match JSX
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/selection/active-line'
// import 'codemirror/addon/fold/foldcode'
// import 'codemirror/addon/fold/foldgutter'
// import 'codemirror/addon/fold/brace-fold'

const fontsLoaded = {}

export default class PlaygroundEditor extends React.Component {
  state = {
    value: this.props.defaultValue || '',
    focus: false,
    key: 0,
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
    clearTimeout(this.clearRefresh)
  }

  componentDidMount() {
    this.loadFont()
  }

  onFocusChange = focus => {
    this.setState({ focus, key: this.state.key + (focus ? 0 : 1) }, () =>
      this.cm.refresh()
    )
  }

  render() {
    const { value, blank, focus, key } = this.state
    const { props } = this
    const {
      onChange,
      codeMirrorOptions,
      theme,
      loadTheme,
      matchBrackets,
      styleActiveLine,
      matchTags,
      getCodeMirror,
    } = props
    return (
      <Codemirror
        key={key}
        ref={el => {
          if (el === null) return
          this.cm = el.getCodeMirror()
          this.clearRefresh = setTimeout(this.cm.refresh)
          if (typeof getCodeMirror === 'function') {
            getCodeMirror(this.cm)
          }
        }}
        value={value}
        onChange={this.onChange}
        onFocusChange={this.onFocusChange}
        options={{
          mode: 'jsx',
          indentWithTabs: false,
          lineNumbers: false,
          keyMap: 'sublime',
          autoCloseBrackets: true,
          lineWrapping: true,
          smartIndent: false,
          ...(focus
            ? {
                matchBrackets,
                styleActiveLine,
                ...(matchTags === 'none'
                  ? {}
                  : {
                      matchTags: { bothTags: matchTags === 'both' },
                    }),
              }
            : {}),
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
