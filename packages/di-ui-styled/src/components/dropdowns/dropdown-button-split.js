import React from 'react'
import styled from 'styled-components'
import Caret from '../caret'

const Box = styled.div`
  border: 1px solid #ABABAB;
  display: flex;
  background: #fff;
  height: ${({ small }) => small ? 35 : 42}px;
  font-size: ${({ small }) => small ? 14 : 16}px;
  box-sizing: border-box;
  align-items: center;
  user-select: none;
  cursor: default;
  white-space: nowrap;
  width: 100%;
`

const FlexSpace = styled.span`
  min-width: 20px;
  flex: 1;
`

const Ellipsis = styled.span`
  flex: 1;
  padding: 0 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CaretWrapper = styled.div`
  background: #ededed;
  height: 100%;
  display: flex;
  width: ${({ small }) => small ? 37 : 45}px;
  border-left: 1px solid #ABABAB;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`

const DropdownButtonSplit = ({ children, ...props }) => (
  <Box {...props} tabIndex="0">
    <Ellipsis>
    {children}
    </Ellipsis>

    <CaretWrapper small={props.small}>
      <Caret style={{ display: 'block' }} />
    </CaretWrapper>
  </Box>
)

export default DropdownButtonSplit
