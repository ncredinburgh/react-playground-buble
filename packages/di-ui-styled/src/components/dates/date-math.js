export const DAY = 1000 * 60 * 60 * 24

export const getDay = date => {
  if (!date) return null
  const result = new Date(0)
  result.setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return result
}

export const getMonth = date => {
  if (!date) return null
  const result = new Date(0)
  result.setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth())
  return result
}

export const getLastOfMonth = date => {
  const result = new Date(0)
  result.setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)
  return result
}

export const monthAdd = (date, amount) => {
  const result = new Date(date.getTime())
  result.setMonth(result.getUTCMonth() + amount)
  return result
}

export const isWeekend = date =>
  date.getDay() === 0 || date.getDay() === 6

export const isMonthEqual = (date1, date2) =>
  date1.getUTCMonth() === date2.getUTCMonth &&
  date1.getUTCFullYear() === date2.getUTCFullYear()

export const getWeeksInMonth = monthDate => {
  const month = monthDate.getUTCMonth()
  const year = monthDate.getUTCFullYear()
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
  return `${pad(date.getUTCMonth() + 1)}/${pad(date.getUTCDate())}/${date.getUTCFullYear()}`
}

export const getLocalDate = () => {
  const now = new Date()
  const month = `0${now.getMonth()}`.substr(-2)
  const year = now.getFullYear()
  const date = `0${now.getDate()}`.substr(-2)
  return new Date(`${year}-${month * 1 + 1}-${date}`)
}
