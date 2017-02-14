import React from 'react'

export default class DownloadForm extends React.Component {
  static defaultProps = {
    name: 'jsonPayload',
  }

  render() {
    const { url, name, value, children } = this.props
    return (
      <form
        method="post"
        action={url}
        ref={el => {
          if (el !== null) this.submit = (() => el.submit())
        }}
      >
        <input
          type="hidden"
          value={JSON.stringify(value)}
          name={name}
        />
        {
          typeof children !== 'function' ?
            children :
            children(() => this.submit())
        }
      </form>
    )
  }
}
