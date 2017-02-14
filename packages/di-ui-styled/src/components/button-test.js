import React from 'react'
import styled from 'styled-components'

let ButtonRed = ({
  element = 'button',
  children,
  ...props
}) => {
  const InnerButton = styled[element]`
    background: red;
  `
  return (
    <InnerButton {...props}>{children}</InnerButton>
  )
}

const ButtonGreen = styled(ButtonRed)`
  background: green;
`

export default ButtonGreen
