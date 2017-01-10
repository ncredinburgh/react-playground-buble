import React from 'react'
import styled from 'styled-components'

const getBorder = focus => ({validity}) => {
  const width = focus ? 2 : 1
  const border = color =>  `border: ${width}px solid ${color};`
  switch(validity) {
    case 'success': return border('#2e6f03');
    case 'error': return border('#c90202');
    case 'warning': return border('#8a6d3b');
    default: return border(focus ? '#666' : '#ccc');
  }
}

const StyledInput = styled.input`
  box-shadow: inset 1px 1px 1px 0;
  display: block;
  width: 100%;
  height: ${({small}) => small ? 35 : 42}px;
  padding: 8px 10px;
  font-size: 16px;
  line-height: 1.42857143;
  color: #333;
  background-color: #fff;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  font-family: inherit;
  margin: 0;
  box-sizing: border-box;
  ${getBorder()}
  &:focus {
    ${getBorder(true)}
    padding: 8px 9px;
    box-shadow: none;
    outline: none;
  }

`

const TextInput = props => <StyledInput type="text" {...props} />

export default TextInput
