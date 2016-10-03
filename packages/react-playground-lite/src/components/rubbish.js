// @flow

import React from 'react'
import JsxEditor from './jsx-editor'
import JsxViewer from './jsx-viewer'
import JsxError from './jsx-error'

class App extends React.Component {
  state = {
    defaultValue: this.props.defaultValue || '',
    source: this.props.defaultValue || '',
    errorMessage: null,
  }
  render() {
    const {
      defaultValue,
      source,
    } = this.state
    return (
      <div style={styles.wrapper}>
        <div style={styles.viewerWrapper}>
          <div style={styles.center}>
            <JsxViewer
              source={source}
              onChange={
                val => this.setState(val)
              }
            />
          </div>
          <JsxError
            source={source}
            errorMessage={this.state.errorMessage}
            style={{
              minWidth: 'calc(100% - 10px)',
              backgroundColor: 'rgba(200,200,200,0.9)',
              color: 'red',
              position: 'absolute',
              bottom: 0,
              margin: 0,
              padding: 5,
            }}
          />
        </div>
        <JsxEditor
          defaultValue={defaultValue}
          onChange={
            val => this.setState({
              source: val,
            })
          }
          style={{
            flex: 1,
            marginLeft: 1,
          }}
        />
      </div>
    )
  }
}

const styles = {
  wrapper: {
    display: 'flex',
  },
  viewerWrapper: {
    display: 'flex',
    position: 'relative',
    flex: 1,
    overflow: 'auto',
    borderRadius: 4,
    marginRight: 1,
    backgroundColor: '#eee',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
}

export default App
