import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { getContext } from 'recompose'
import Modal from './modal'

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

class ModalProvider2 extends React.Component {
  modalItems = []
  modalHide = false

  static childContextTypes = {
    pushModal: React.PropTypes.func,
  }

  getChildContext() {
    return {
      pushModal: this.pushModal
    }
  }

  pushModal = content => {
    const { modalItems } = this
    const modalItem = new ModalItem(content, this.popModal)
    this.modalItems = [...modalItems, modalItem]
    this.portalRender(this.props)
    return modalItem.promise
  }

  popModal = () => {
    const { modalItems } = this
    this.modalItems = modalItems.slice(1)
    this.modalHide = true
    this.popModalTimeout = setTimeout(() => {
      this.modalHide = false
      this.portalRender(this.props)
    }, 300)
    this.portalRender(this.props)
  }

  portalRender = props => {
    const { themeChooser, children } = props
    const theme = (themeChooser && themeChooser.theme) || {}
    const { modalItems, modalHide } = this
    const modalItem = modalItems[0]
    const show = modalItems.length && !modalHide
    const content = modalItem ?
      modalItem.content :
      ''
    const reject = modalItem ? modalItem.reject : () => {}
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <Modal show={show} portal={false} zIndex={1000} onCancel={reject}>
          {content}
        </Modal>
      </ThemeProvider>
    , this.el)
  }

  componentWillMount() {
    this.el = document.createElement('div')
    document.body.appendChild(this.el)
    this.portalRender(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.portalRender(nextProps)
  }

  componentWillUnmount() {
    clearTimeout(this.popModalTimeout)
    ReactDOM.unmountComponentAtNode(this.el)
    document.body.removeChild(this.el)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

const enhance = getContext({
  themeChooser: React.PropTypes.shape({
    theme: React.PropTypes.object,
    onChangeTheme: React.PropTypes.func
  }),
})

export default enhance(ModalProvider2)
