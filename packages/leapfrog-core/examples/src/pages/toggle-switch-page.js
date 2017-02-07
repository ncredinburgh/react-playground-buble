import React from 'react'
import Title from '../components/title'
import { PageHeader, Spacer, ToggleSwitch } from '../../../src'

import Playground from '../components/themed-playground'
import DocPage from '../components/doc-page'

const ToggleSwitchPage = () => (
  <DocPage>
    <Title>Loader</Title>
    <p>Default:</p>
    <Playground
      defaultValue={
`<ToggleSwitch />`
      }
      scope={{ ToggleSwitch }}
    />
    <p>`small`:</p>
    <Playground
      defaultValue={
`<ToggleSwitch small />`
      }
      scope={{ ToggleSwitch }}
    />
    <p>`disabled`:</p>
    <Playground
      defaultValue={
`<ToggleSwitch disabled />`
      }
      scope={{ ToggleSwitch }}
    />
  </DocPage>
)

export default ToggleSwitchPage
