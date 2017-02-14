import React, { Component } from 'react'
import {
  HashRouter,
  Route,
  Redirect,
} from 'react-router-dom'

window.React = React

import { diTheme } from '../../src/themes'
import ThemeChooserProvider from '../../src/components/theme-chooser-provider'
import CaretPage from './pages/caret-page'
import PageHeaderPage from './pages/page-header-page'
import ButtonPage from './pages/button-page'
import ToastPage from './pages/toast-page'
import DropdownPage from './pages/dropdown-page'
import DatePickerPage from './pages/date-picker-page'
import LeapfrogIconsPage from './pages/leapfrog-icons-page'
import LoaderPage from './pages/loader-page'
import TextInputPage from './pages/text-input-page'
import CheckboxPage from './pages/checkbox-page'
import RadioPage from './pages/radio-page'
import ModalPage from './pages/modal-page'
import ToggleSwitchPage from './pages/toggle-switch-page'
import Ie9Page from './pages/ie9-page'
import StatusPage from './pages/status-page'
import Menu from './components/menu'
import styled from 'styled-components'
import { themeBroadcast } from './index'
import '../../src/utils/inject-global-css'

const Wrapper = styled.div`
 display: flex;
 flex-direction: column-reverse;
 @media (min-width: 768px) {
   flex-direction: row;
 }
`

const Page = styled.div`
 flex: 1;
 margin: 23px;

`

// const themeBroadcast = new ThemeBroadcast(defaultTheme)
// initThemedPlayground(themeBroadcast)


const App = () => (
  <HashRouter>
    <ThemeChooserProvider themeBroadcast={themeBroadcast}>
      <Wrapper>
        <Menu />
        <Page themeBroadcast={themeBroadcast}>
          <Route exact path="/examples/intro" component={StatusPage} />
          <Route exact path="/examples/caret" component={CaretPage} />
          <Route exact path="/examples/page-header" component={PageHeaderPage} />
          <Route exact path="/examples/button" component={ButtonPage} />
          <Route exact path="/examples/toast" component={ToastPage} />
          <Route exact path="/examples/text-input" component={TextInputPage} />
          <Route exact path="/examples/dropdown" component={DropdownPage} />
          <Route exact path="/examples/date-picker" component={DatePickerPage} />
          <Route exact path="/examples/di-ui-icon-elements" component={LeapfrogIconsPage} />
          <Route exact path="/examples/loader" component={LoaderPage} />
          <Route exact path="/examples/checkbox" component={CheckboxPage} />
          <Route exact path="/examples/radio" component={RadioPage} />
          <Route exact path="/examples/modal" component={ModalPage} />
          <Route exact path="/examples/toggle-switch" component={ToggleSwitchPage} />
          <Route exact path="/examples/ie9" component={Ie9Page} />
          <Route exact path="/" render={() => <Redirect to="/examples/button" />} />
        </Page>
      </Wrapper>
    </ThemeChooserProvider>
  </HashRouter>
)

export default App
