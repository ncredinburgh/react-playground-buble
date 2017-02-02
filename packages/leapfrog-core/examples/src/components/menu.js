import React from 'react'
import {
  Link,
} from 'react-router'
import styled from 'styled-components'
import { fromTheme } from '@di-internal/leapfrog-util'

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
    &:hover {
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

const MenuItem = ({ pathname, label }) => {
  const selected = window.location.pathname === pathname ||
    (window.location.hash && (window.location.hash.substring(1) === pathname))
  return (
    <MenuListItem selected={selected}>
      <Link to={pathname}>{label}</Link>
    </MenuListItem>
  )
}

const Menu = () => (
  <Wrapper>
    <MenuTitle>React Responsive UI</MenuTitle>
    <div></div>
    <Ul>
      <MenuItem pathname="/examples/intro" label="Introduction" />
      <MenuItem pathname="/examples/button" label="Button" />
      <MenuItem pathname="/examples/text-input" label="TextInput" />
      <MenuItem pathname="/examples/checkbox" label="Checkbox" />
      <MenuItem pathname="/examples/radio" label="Radio" />
      <MenuItem pathname="/examples/toast" label="Toasts" />
      <MenuItem pathname="/examples/dropdown" label="Dropdowns" />
      <MenuItem pathname="/examples/date-picker" label="DatePicker" />
      <MenuItem pathname="/examples/leapfrog-icons" label="Icons" />
      <MenuItem pathname="/examples/modal" label="Modal" />
      <MenuItem pathname="/examples/loader" label="Loader" />
      <MenuItem pathname="/examples/toggle-switch" label="ToggleSwitch" />
      <MenuItem pathname="/examples/page-header" label="PageHeader" />
      <MenuItem pathname="/examples/caret" label="Caret" />
    </Ul>
  </Wrapper>
)

export default Menu
