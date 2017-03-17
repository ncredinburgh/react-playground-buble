import React from 'react'
import styled from 'styled-components'
import Caret from '../caret'
import Spacer from '../spacer'
import { fromTheme } from '../../utils/theme-util'

const Wrapper = styled.div`
  box-sizing: border-box;
  user-select: none;
  cursor: default;
  text-align: right;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
`

const Ellipsis = styled.span`
  flex: 1;
  padding: 0 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CaretWrapper = styled.div`
  width: 37px;
`

const Link = styled.span`
  color: ${fromTheme('sectionCColor')};
  text-decoration: underline;
  font-size: ${({ small }) => small ? 14 : 16}px;
`

const DropdownButtonLink = ({ children, ...props }) => (
  <Wrapper {...props} tabIndex="0">
    <Link small={props.small}>{children}</Link>
    <Spacer />
    <Caret />
  </Wrapper>
)

export default DropdownButtonLink
