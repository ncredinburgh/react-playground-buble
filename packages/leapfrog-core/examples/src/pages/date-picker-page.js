import React from 'react'
import Title from '../components/title'
import { Day, Month, MonthChooser, DatePicker, DateDropdown, DateDropdownPrimative } from '../../../src'

import Playground from '../components/themed-playground'

const DayPage = () => (
  <div>
    <Title>DatePicker</Title>
    <Playground
      minHeight={500}
      defaultValue={
    `
    <div style={{ height: 500 }}>
      <DateDropdownPrimative range/>
    </div>


















    `
    }
      scope={{ DateDropdownPrimative }}
      top left fullWidth
    />

    <Playground
      defaultValue={
    `<DatePicker />`
    }
      scope={{ DatePicker }}
      top left fullWidth
    />
    <p>Default:</p>
    <Playground
      defaultValue={
`<div>
  <Day type="unselected">31</Day>
  <Day type="start">31</Day>
  <Day type="range">31</Day>
  <Day type="stop">31</Day>
  <Day type="disabled">31</Day>
</div>`
}
      scope={{ Day }}
      top left fullWidth
    />
MonthChooser:
    <Playground
      defaultValue={
'<MonthChooser defaultValue={new Date()} />'
}
      scope={{ MonthChooser }}
      top left fullWidth
    />
    <p>Default:</p>
    <Playground
      defaultValue={
`<Month
  showMonth={new Date('2015-11-01')}
  year={2015}
  month={11}
  minStartDate={new Date('2015-11-05')}
  maxEndDate={new Date('2015-11-25')}
  firstSelected={new Date('2015-11-10')}
  range
  disableWeekends
/>
`
}
      scope={{ Month }}
      top left fullWidth
    />
    <p>Default:</p>
    <Playground
      defaultValue={
`<Month
  showMonth={new Date('2015-11-01')}
  year={2015}
  month={11}
  minStartDate={new Date('2015-11-05')}
  maxEndDate={new Date('2015-11-25')}
  disableWeekends
/>
`
}
      scope={{ Month }}
      top left fullWidth
    />
  </div>
)

export default DayPage
