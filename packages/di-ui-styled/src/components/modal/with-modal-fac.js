import React from 'react'

type WithModalType = {
  children: () => React.Element<*>,
}

export default class WithModal extends React.Component {
  props: WithModalType
  render() {
    const { pushModal } = this.context
    return this.props.children(pushModal)
  }
}

WithModal.contextTypes = {
  pushModal: React.PropTypes.func,
}
