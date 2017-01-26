import React from 'react'
import styled from 'styled-components'
import shouldPureComponentUpdate from 'react-pure-render/function'

const Cell = styled.div`
  width: 40px;
  padding: 10px 0;
  text-align: center;
  color: #666;
`
const Wrapper = styled.div`
  user-select: none;
  display: flex;
`
export default class DayNames extends React.Component {
  static defaultProps = {
    dayNames: 'S M T W T F S'.split(' '),
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { dayNames } = this.props
    return (
      <Wrapper>
        {dayNames.map((name, i) => <Cell key={i}>{name}</Cell>)}
      </Wrapper>
    )
  }
}
