import React from 'react'
import styled from 'styled-components'
import Caret from '../caret'

const Box = styled.div`
  display: flex;
  background: ${({ onGray }) => onGray ? '#fff' : '#ededed'};
  height: 42px;
  align-items: center;
  box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.45);
  padding: 0 20px;
  user-select: none;
  cursor: default;
  white-space: nowrap;
  width: calc(100% - 40px);
`

const FlexSpace = styled.span`
  min-width: 20px;
  flex: 1;
`

const Ellipsis = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DropdownButton = ({ children, ...props }) => (
  <Box {...props} tabIndex="0">
    <Ellipsis>
    {children}
    </Ellipsis>
    <FlexSpace />

    <div>
      <Caret style={{ display: 'block' }} />
    </div>
  </Box>
)

export default DropdownButton
