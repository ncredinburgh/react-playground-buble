import React from 'react'
//import Modal from './modal'

class ModalItem {
  constructor(content, popModal) {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = value => {
        popModal()
        resolve(value)
      }
      this.reject = value => {
        popModal()
        reject(value)
      }
    })
    this.content = content(this.resolve, this.reject)
  }
}

export default class ModalProvider extends React.Component {
  state = {
    modalItems: [],
  }

  static childContextTypes = {
    pushModal: React.PropTypes.func,
  }

  pushModal = content => {
    const { modalItems } = this.state
    const modalItem = new ModalItem(content, this.popModal)
    this.setState({
      modalItems: [...modalItems, modalItem],
    })
    return modalItem.promise
  }

  popModal = () => {
    const { modalItems } = this.state
    this.setState({
      modalItems: modalItems.slice(1),
    })
  }

  getChildContext() {
    return {
      pushModal: this.onPushModal
    }
  }

  componentWillMount() {
    const { themeBroadcast } = this.props
    if (!themeBroadcast) return
    themeBroadcast.addListener(this.onChangeTheme)
  }

  componentWillUnmount() {
    const { themeBroadcast } = this.props
    if (!themeBroadcast) return
    themeBroadcast.removeListener(this.onChangeTheme)
  }

  render() {
    const { children } = this.props
    const { modalItems } = this.state
    const modalItem = modalItems[0]
    const show = !!modalItems.length
    const content = this.modalItem ?
      modalItem.content :
      ''
    console.log(modalItem, content, show)

    return children(show, content)
    //   <div>
    //     <Modal show={show} zIndex={2}>
    //       {modalContent}
    //     </Modal>
    //     {children}
    //   </div>
    // )
  }
}
