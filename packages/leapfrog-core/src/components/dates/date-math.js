export const DAY = 1000 * 60 * 60 * 24

export const getDay = date => {
  if (!date) return null
  const result = new Date(0)
  result.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
  return result
}

export const getMonth = date => {
  if (!date) return null
  const result = new Date(0)
  result.setFullYear(date.getFullYear(), date.getMonth())
  return result
}

export const getLastOfMonth = date => {
  const result = new Date(0)
  result.setFullYear(date.getFullYear(), date.getMonth() + 1, 0)
  return result
}

export const monthAdd = (date, amount) => {
  const result = new Date(date.getTime())
  result.setMonth(result.getMonth() + amount)
  return result
}

export const isWeekend = date =>
  date.getDay() === 0 || date.getDay() === 6

export const isMonthEqual = (date1, date2) =>
  date1.getMonth() === date2.getMonth &&
  date1.getFullYear() === date2.getFullYear()

export const getWeeksInMonth = monthDate => {
  const month = monthDate.getMonth()
  const year = monthDate.getFullYear()
  const monthStart = getMonth(monthDate)
  const monthEnd = getLastOfMonth(monthDate)
  const firstDay = monthStart.getDay()
  const lastDay = monthEnd.getDay()
  const ulTime = monthStart.getTime() - firstDay * DAY
  const brTime = monthEnd.getTime() + (7 - lastDay) * DAY
  let row = []
  const rows = []
  for (let time = ulTime; time < brTime; time += DAY) {
    const date = new Date(time)
    row.push(date)
    if (row.length === 7) {
      rows.push(row)
      row = []
    }
  }
  return rows
}

const pad = x => `0${x}`.substr(-2)

export const formatUsDate = date => {
  if (!date) return ''
  return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`
}
