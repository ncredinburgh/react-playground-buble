import React from 'react'
import styled from 'styled-components'
import { fromTheme } from '../utils/theme-util'

import {
  compose,
  defaultProps,
  setDisplayName,
} from 'recompose'

const H1 = styled.h1`
  font-size: 28px;
  font-family: Arial, sans-serif;
  line-height: 1;
  margin: 0;
  padding: 0;
  color: ${fromTheme('sectionCColor')};
`
const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  text-align: center;
  justify-content: space-between;
  margin: 0 0 15px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
`

const PageHeader = ({
  children,
  title,
  padding,
  margin,
}) => (
  <Wrapper
    style={padding ? {
      paddingLeft: padding,
      paddingRight: padding,
      marginLeft: margin,
      marginRight: margin,
    } : {}}
  >
    <H1>{title}</H1>
    {children}
  </Wrapper>
)

export default PageHeader
