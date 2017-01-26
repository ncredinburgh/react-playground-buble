import React from 'react'
import styled from 'styled-components'
import { Forward, Back } from '@di-internal/leapfrog-icons'
import { fromTheme } from '@di-internal/leapfrog-util'
import { monthAdd } from './date-math'

const Wrapper = styled.div`
  display: flex;
  color: ${fromTheme('sectionAColor')};
  position: relative;
  user-select: none;
  align-items: center;
`
const Text = styled.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
`

const Icon = styled.div`
  padding: 0 20px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default class MonthChooser extends React.Component {
  static defaultProps = {
    defaultValue: new Date(),
  }

  state = {
    value: this.props.defaultValue,
  }

  changeDate = sgn => () => {
    const { onChange } = this.props
    const { value } = this.state
    const month = value.getMonth()
    const year = value.getFullYear()
    const date = new Date(0)
    const nextValue = monthAdd(value, sgn)
    this.setState({
      value: nextValue,
    })
    if (!onChange) return
    this.props.onChange(nextValue)
  }

  onNext = this.changeDate(1)
  onPrev = this.changeDate(-1)

  getText = () => {
    const { value } = this.state
    return `${months[value.getMonth()]} ${value.getFullYear()}`
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this
    return nextState.value.getTime() !== state.value.getTime()
  }

  render() {
    const { onPrev, onNext, getText } = this
    return (
      <Wrapper>
        <Icon onClick={onPrev}><Back /></Icon>
          <Text>{getText()}</Text>
        <Icon onClick={onNext}><Forward /></Icon>
      </Wrapper>
    )
  }
}
