import React from 'react'
import Title from '../components/title'
import { Day } from '../../../src'

import Playground from '../components/themed-playground'

const DayPage = () => (
  <div>
    <Title>DatePicker</Title>
    <p>Default:</p>
    <Playground
      defaultValue={
`
<div>
  <Day>31</Day>
  <Day type="selectEnd">31</Day>
  <Day type="start">31</Day>
  <Day type="range">31</Day>
  <Day type="stop">31</Day>
  <Day type="disabled">31</Day>
  <Day type="rangeSelectStart">31</Day>
  <Day type="stopSelectStart">31</Day>

</div>`
}
      scope={{ Day }}
      top left fullWidth
    />
  </div>
)

export default DayPage
