import React from 'react'
import PlaygroundEditor from './playground-editor'
import PlaygroundViewer from './playground-viewer'
import PlaygroundError from './playground-error'

export  default class ReactPlaygroundLite extends React.Component {
  state = {
    defaultValue: this.props.defaultValue || '',
    source: this.props.defaultValue || '',
    errorMessage: '',
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
            <PlaygroundViewer
              source={source}
              onChange={
                val => this.setState(val)
              }
            />
          </div>
          <PlaygroundError
            source={source}
            errorMessage={this.state.errorMessage}
            style={{
              minWidth: 'calc(100% - 10px)',
              //backgroundColor: 'rgba(100,0,200,0.9)',
              backgroundColor: 'rgba(200,200,200,0.9)',
              color: 'red',
              position: 'absolute',
              bottom: 0,
              margin: 0,
              padding: 5,
            }}
          />
        </div>
        <PlaygroundEditor
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
    lineHeight: 1.3,
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
