import React from 'react'
import {
  Link,
} from 'react-router-dom'
import styled from 'styled-components'
import { fromTheme } from '../../../src'

const Ul = styled.ul`
  color: ${fromTheme('sectionATextColor')};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
`

const MenuListItem = styled.li`
  &>a {
    color: ${fromTheme('sectionATextColor')};
    text-decoration: none;
    line-height: 42px;
    padding: 0 20px;
    display: block;
    font-weight: normal;
    font-size: 14px;
    ${({ selected }) => selected ? 'background-color: #6cc3eb;' : ''}
    &:hover, &:active {
      background-color: #6cc3eb;
    }
  }
`

const MenuTitle = styled.h2`
  font-size: 26px;
  padding: 23px 20px;
  border-bottom: 2px solid #2d89c1;
`

const Wrapper = styled.div`
  background-color: ${fromTheme('sectionCColor')};
  color: ${fromTheme('sectionATextColor')};
  @media (min-width: 768px) {
    width: 220px;
  }
  min-height: 100vh;
  box-sizing: border-box;
`

const MenuItem = ({ pathname, label, setPath }) => {
  const selected = window.location.pathname === pathname ||
    (window.location.hash && (window.location.hash.substring(1) === pathname))
  return (
    <MenuListItem selected={selected}>
      <Link to={pathname} onClick={() => setPath(pathname)}>{label}</Link>
    </MenuListItem>
  )
}

class Menu extends React.Component {
  state = {
    path: '/',
  }

  setPath = path => {
    document.body.scrollTop = 0
    this.setState({ path })
  }

  render() {
    const { setPath } = this
    return (
      <Wrapper>
        <MenuTitle>React Responsive UI</MenuTitle>
        <div></div>
        <Ul>
          <MenuItem pathname="/examples/intro" label="Introduction" setPath={setPath} />
          <MenuItem pathname="/examples/button" label="Button" setPath={setPath} />
          <MenuItem pathname="/examples/text-input" label="TextInput" setPath={setPath} />
          <MenuItem pathname="/examples/checkbox" label="Checkbox" setPath={setPath} />
          <MenuItem pathname="/examples/radio" label="Radio" setPath={setPath} />
          <MenuItem pathname="/examples/toast" label="Toasts" setPath={setPath} />
          <MenuItem pathname="/examples/dropdown" label="Dropdowns" setPath={setPath} />
          <MenuItem pathname="/examples/date-picker" label="DatePicker" setPath={setPath} />
          <MenuItem pathname="/examples/di-ui-icon-elements" label="Icons" setPath={setPath} />
          <MenuItem pathname="/examples/modal" label="Modal" setPath={setPath} />
          <MenuItem pathname="/examples/loader" label="Loader" setPath={setPath} />
          <MenuItem pathname="/examples/toggle-switch" label="ToggleSwitch" setPath={setPath} />
          <MenuItem pathname="/examples/page-header" label="PageHeader" setPath={setPath} />
          <MenuItem pathname="/examples/caret" label="Caret" setPath={setPath} />
        </Ul>
      </Wrapper>
    )
  }
}
//const Menu = () => <div />

export default Menu
