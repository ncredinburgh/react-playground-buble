import React from 'react'
import {
  Link,
} from 'react-router'
import styled from 'styled-components'
import { fromTheme } from '../../../src/util/from-theme'

const Ul = styled.ul`
  color: ${fromTheme('sectionATextColor')};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  &>li {

  }
  &>li>a {
    color: ${fromTheme('sectionATextColor')};
    text-decoration: none;
    line-height: 42px;
    padding: 0 20px;
    display: block;
    font-weight: normal;
    font-size: 14px;
    &:hover {
      background-color: #6cc3eb;
    }
  }
`

const MenuTitle = styled.h2`
  font-size: 26px;
  padding: 26px 20px;
  border-bottom: 2px solid #2d89c1;
`

const Wrapper = styled.div`
  background-color: ${fromTheme('sectionAColor')};
  color: ${fromTheme('sectionATextColor')};
  width: 220px;
  min-height: 100vh;
  box-sizing: border-box;
`

const Menu = () => (
  <Wrapper>
    <MenuTitle>Leapfrog</MenuTitle>
    <Ul>
      <li><Link to="/examples/">Caret</Link></li>
      <li><Link to="/examples/button">Button</Link></li>
      <li><Link to="/examples/text-input">TextInput</Link></li>
      <li><Link to="/examples/checkbox">Checkbox</Link></li>
      <li><Link to="/examples/page-header">PageHeader</Link></li>
      <li><Link to="/examples/toast">Toasts</Link></li>
      <li><Link to="/examples/multiselect-dropdown">MultiselectDropdown</Link></li>
      <li><Link to="/examples/leapfrog-icons">Icons</Link></li>
      <li><Link to="/examples/loader">Loader</Link></li>
    </Ul>
  </Wrapper>
)

export default Menu
