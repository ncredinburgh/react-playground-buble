import React from 'react'
import PlaygroundEditor from './playground-editor'
import PlaygroundViewer from './playground-viewer'
import PlaygroundError from './playground-error'

export const getStyles = ({
  top,
  bottom,
  left,
  right,
  gutter,
  padding,
  borderRadius,
  backgroundColor,
  viewerFlex,
  editorFlex,
}) => {
  let alignItems = 'center'
  let justifyContent = 'center'
  if (top) alignItems = 'flex-start'
  if (bottom) alignItems = 'flex-end'
  if (left) justifyContent = 'flex-start'
  if (right) justifyContent = 'flex-end'
  return {
    playgroundWrapper: {
      display: 'flex',
      lineHeight: 1.3,
    },
    viewerWrapper: {
      display: 'flex',
      position: 'relative',
      flex: viewerFlex,
      overflow: 'auto',
      borderRadius,
      marginRight: gutter,
      backgroundColor,
      boxSizing: 'border-box',
    },
    viewerAlignment: {
      display: 'flex',
      alignItems,
      justifyContent,
      flex: 1,
      margin: padding,
    },
    editor: {
      flex: editorFlex,
      marginLeft: gutter,
      border: '1px solid #eee',
    },
    error: {
      minWidth: `calc(100% - ${padding}px)`,
      backgroundColor: 'rgba(200,200,200,0.9)',
      color: 'red',
      position: 'absolute',
      bottom: 0,
      margin: 0,
      padding: 5,
    },
  }
}

export default class ReactPlaygroundLite extends React.Component {
  state = {
    defaultValue: this.props.defaultValue || '',
    source: this.props.defaultValue || '',
    errorMessage: '',
  }
  static defaultProps = {
    getStyles,
    borderRadius: 7,
    fontFamily: 'Source Sans Pro',
    padding: 12,
    gutter: 4,
    backgroundColor: '#fcfcfc',
    viewerFlex: '1',
    editorFlex: '1',
  }
  render() {
    const {
      defaultValue,
      source,
      errorMessage,
    } = this.state

    const {
      borderRadius,
      fontFamily,
      padding,
      wrapOutput,
    } = this.props

    let { editorPadding } = this.props
    if (editorPadding === undefined) editorPadding = padding - 4
    const styles = this.props.getStyles(this.props)
    return (
      <div style={styles.playgroundWrapper}>
        <div style={styles.viewerWrapper}>
          <div style={styles.viewerAlignment}>
            <PlaygroundViewer
              source={source}
              scope={this.props.scope}
              style={this.props.viewerStyle}
              onChange={
                val => this.setState(val)
              }
              wrapOutput={wrapOutput}
            />
          </div>
          <PlaygroundError
            source={source}
            errorMessage={errorMessage}
            style={styles.error}
          />
        </div>
        <PlaygroundEditor
          defaultValue={defaultValue}
          onChange={
            val => this.setState({
              source: val,
            })
          }
          style={styles.editor}
          borderRadius={borderRadius}
          fontFamily={fontFamily}
          editorPadding={editorPadding}
        />
      </div>
    )
  }
}
