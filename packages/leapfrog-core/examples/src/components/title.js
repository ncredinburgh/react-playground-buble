import React from 'react'
import ThemeChooser from '../../../src/components/theme-chooser'
import { PageHeader } from '../../../src'

const Title = ({ children }) => (
  <PageHeader title={children} padding={23} margin={-23}>
    <ThemeChooser />
  </PageHeader>
)

export default Title
