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
  H2,
  H3,
} from '../../../src'

import Playground from '../components/themed-playground'
import PropsDocs from '../components/props-docs'
import DocPage from '../components/doc-page'

const src = require('!!raw-loader!../../../src/components/dates/date-dropdown')
const src2 = require('!!raw-loader!../../../src/components/dates/date-range-dropdown')

const DayPage = () => (
  <DocPage>
    <Title>Date Pickers</Title>
    <p>DateDropdown</p>
    <Playground
      defaultValue={`<DateDropdown />`}
      scope={{ DateDropdown, DateRangeDropdown }}
      minHeightViewer={470}
      top
    />
    <p>DateRangeDropdown</p>
    <Playground
      defaultValue={`<DateRangeDropdown/>`}
      minHeightViewer={470}
      scope={{ DateRangeDropdown, DateRangeDropdown }}
      top
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
      top
    />

    <p>Disable weekends</p>
    <Playground
      defaultValue={`<DateDropdown disableWeekends/>`}
      minHeightViewer={470}
      scope={{ DateDropdown }}
      top
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
      scope={{ DateDropdown, DateRangeDropdown }}
      top
    />
    <h2>Props</h2>
    <p>The date picker uses UTC dates. The time at midnight represents the day.
    You can construct a UTC date like
    this <code>new Date('2017-02-01')</code> (note zero padding is needed on months and dates).
    Also note that <code>new Date()</code> gets a date in the current timezone.
    This may resolve to a different UTC date. So to normalize todays date do the following:
    </p>
<pre>{`const normalizeLocalDate = (date) => {
  const zeroPad = x => \`0\${x}\`.substr(-2)
  const year = localDate.getFullYear()
  const month = zeroPad(localDate.getMonth())
  const date = zeroPad(localDate.getDate())
  return new Date(\`\${year}-\${month}-\${date}\`)
}

const utcToday = normalizeLocalDate(new Date())
`}</pre>
    <H2>DateDropdown Props</H2>
    <PropsDocs src={src} />
    <H2>DateRangeDropdown Props</H2>
    <PropsDocs src={src2} />
  </DocPage>
)

export default DayPage
