import React from 'react'
import Title from '../components/title'
import {
  Day,
  Month,
  MonthChooser,
  DatePicker,
  DateDropdownPrimative,
  DownloadForm,
  DateDropdown,
  DateRangeDropdown,
} from '../../../src'

import Playground from '../components/themed-playground'

const minHeight = height => children => (
  <div style={{minHeight: height}}>
    hello
    {children}
  </div>
)

const DayPage = () => (
  <div>

    <Title>Date Pickers</Title>
    <p>DateDropdown</p>
    <Playground
      defaultValue={`<DateDropdown />`}
      minHeightViewer={470}
      scope={{ DateDropdown }}
      top left fullWidth
    />

    <p>DateRangeDropdown</p>
    <Playground
      defaultValue={`<DateRangeDropdown/>`}
      minHeightViewer={470}
      scope={{ DateRangeDropdown }}
      top left fullWidth
    />

    <p>onChange and defaultValue</p>
    <Playground
      defaultValue={
`<DateDropdown
  defaultValue={new Date()}
  onChange={value => console.log}
/>`
}
      minHeightViewer={470}
      scope={{ DateDropdown, DateRangeDropdown }}
      top left fullWidth
    />

    <p>Disable weekends</p>
    <Playground
      defaultValue={`<DateDropdown disableWeekends/>`}
      minHeightViewer={470}
      scope={{ DateDropdown }}
      top left fullWidth
    />
    <p>minStartDate and maxEndDate</p>
    <Playground
      defaultValue={
  `const now = Date.now()
  const DAY = 60 * 60 * 24 * 1000
  const minStartDate = new Date(now - 5 * DAY)
  const maxEndDate = new Date(now + 5 * DAY);

  <DateDropdown
  minStartDate={minStartDate}
  maxEndDate={maxEndDate}
  />`}
      minHeightViewer={470}
      scope={{ DateDropdown }}
      top left fullWidth
    />
  </div>
)

export default DayPage
