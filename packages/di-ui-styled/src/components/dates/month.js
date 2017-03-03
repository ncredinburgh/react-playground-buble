import React from 'react'
import styled from 'styled-components'
import Day from './day-anim'
import { getWeeksInMonth, isWeekend, getLocalDate } from './date-math'
import withTheme from '../with-theme-hoc'

const Row = styled.div`
  display: flex;
  height: 40px;
`

class Month extends React.Component {
  state = {
    hoveredDate: null,
  }

  mouseEnterFns = {}
  mouseLeaveFns = {}
  selectFns = {}

  dateToType = (date, i) => {
    const {
      maxEndDate,
      minStartDate,
      disableWeekends,
      firstSelected,
      lastSelected,
      range,
    } = this.props

    const time = date.getTime()
    const iAm = x => x && (time === x.getTime())
    const { hoveredDate } = this.state
    const isFirstSelected = iAm(firstSelected)
    const isLastSelected = iAm(lastSelected)
    const isHovered = iAm(hoveredDate)

    if ((isWeekend(date) && disableWeekends) ||
      (maxEndDate && date > maxEndDate) ||
      (minStartDate && date < minStartDate)) {
      return 'disabled'
    }

    if (!range) {
      if (isFirstSelected || isHovered) return 'start'
      return 'unselected'
    }

    if (!firstSelected && isHovered) return 'start'
    if (isLastSelected) return 'stop'
    if (lastSelected && isHovered) return 'start'

    if (isFirstSelected) {
      return lastSelected || hoveredDate === null || hoveredDate >= date ?
        'start' :
        'stop'
    }
    if (isHovered) {
      return hoveredDate >= firstSelected ?
        'stop' :
        'start'
    }
    const last = lastSelected || hoveredDate
    if (firstSelected && (last && ((date < last && date > firstSelected) || (date > last && date < firstSelected)))) {
      return 'range'
    }

    return 'unselected'
  }

  onMouseEnterDate = date => {
    const time = date.getTime()
    const fn = this.mouseEnterFns[time]
    if (!fn) {
      this.mouseEnterFns[time] = () => {
        const type = this.dateToType(date)
        if (type === 'disabled') return
        this.setState({ hoveredDate: date })
      }
    }
    return this.mouseEnterFns[time]
  }


  onMouseLeaveDate = date => {
    const time = date.getTime()
    const fn = this.mouseLeaveFns[time]
    if (!fn) {
      this.mouseLeaveFns[time] = () => {
        const type = this.dateToType(date)
        if (type === 'disabled') return
        this.setState({ hoveredDate: null })
      }
    }
    return this.mouseLeaveFns[time]
  }

  getHoopColor = date => {
    if (date.getTime() !== getLocalDate().getTime()) {
      return null
    }
    const { theme } = this.props
    return (!theme || !theme.sectionCColor) ?
      '#666' :
      theme.sectionCColor
  }

  onSelect = date => {
    const time = date.getTime()
    const fn = this.selectFns[time]
    if (!fn) {
      this.selectFns[time] = () => {
        const { onSelect } = this.props
        if (onSelect) onSelect(date)
      }
    }
    return this.selectFns[time]
  }

  render() {
    const { showMonth } = this.props
    const { hoveredDate } = this.state

    const {
      dateToType,
      onMouseEnterDate,
      onMouseLeaveDate,
      onSelect,
      getHoopColor,
    } = this

    const rows = getWeeksInMonth(showMonth)
//    const usedDates = {}

    const item = (date) => {
      const dateStr = date.getUTCDate()
  //    const key = usedDates[dateStr] ? dateStr + 'b' : dateStr
      return (
        <Day
          key={date.getTime()} type={dateToType(date)}
          onMouseEnter={onMouseEnterDate(date)}
          onMouseLeave={onMouseLeaveDate(date)}
          onClick={onSelect(date)}
          hoopColor={getHoopColor(date)}
        >
          {dateStr}
        </Day>
      )
    }

    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          rows.map((row, i) => (
            row.map(item)
          ))
        }
      </div>
    )
  }
}

export default withTheme(Month)
