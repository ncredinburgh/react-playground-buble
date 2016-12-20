import React from 'react'

type WithPushModalType = {
  children: () => React.Element<*>,
}

export default class WithPushModal extends React.Component {
  props: WithPushModalType
  render() {
    const { pushModal } = this.context
    return this.props.children(pushModal)
  }
}

WithPushModal.contextTypes = {
  pushModal: React.PropTypes.func,
}
