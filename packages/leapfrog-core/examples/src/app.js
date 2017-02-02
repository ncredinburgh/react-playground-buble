import React, { Component } from 'react'
import {
  HashRouter,
  Match,
  Link,
  Miss,
} from 'react-router'

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
          <Match exactly pattern="/examples/intro" component={StatusPage} />
          <Match exactly pattern="/examples/caret" component={CaretPage} />
          <Match exactly pattern="/examples/page-header" component={PageHeaderPage} />
          <Match exactly pattern="/examples/button" component={ButtonPage} />
          <Match exactly pattern="/examples/toast" component={ToastPage} />
          <Match exactly pattern="/examples/text-input" component={TextInputPage} />
          <Match exactly pattern="/examples/dropdown" component={DropdownPage} />
          <Match exactly pattern="/examples/date-picker" component={DatePickerPage} />
          <Match exactly pattern="/examples/leapfrog-icons" component={LeapfrogIconsPage} />
          <Match exactly pattern="/examples/loader" component={LoaderPage} />
          <Match exactly pattern="/examples/checkbox" component={CheckboxPage} />
          <Match exactly pattern="/examples/radio" component={RadioPage} />
          <Match exactly pattern="/examples/modal" component={ModalPage} />
          <Match exactly pattern="/examples/toggle-switch" component={ToggleSwitchPage} />
          <Match exactly pattern="/examples/ie9" component={Ie9Page} />
          <Miss render={() => <ButtonPage />} />
        </Page>
      </Wrapper>
    </ThemeChooserProvider>
  </HashRouter>
)

export default App
