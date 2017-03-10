import React from 'react'
import Title from '../components/title'
import {
  PageHeader,
  Dropdown,
  DropdownSplit,
  DropdownLink,
  DropdownButton,
  DropdownButtonSplit,
  H2,
  H3,
} from '../../../src'
import * as Icons from '@di-internal/di-ui-icon-elements'

import Playground from '../components/themed-playground'
import PropsDocs from '../components/props-docs'
const src = require('!!raw-loader!../../../src/components/dropdowns/dropdown')
import DocPage from '../components/doc-page'

const PageHeaderPage = () => (
  <DocPage>
      <Title>Dropdown</Title>
<p>Dropdown allowing only one item to be selected at a time:</p>
<Playground
  defaultValue={
`const options = [
  { label: 'Customer ID' },
  { label: 'Customer Name' },
  { label: 'Hold Date' },
  { label: 'Registration Date' },
];

<Dropdown
  title="Select"
  defaultValue={options[1]}
  options={options}
  onChange={console.log}
/>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={380}
  top
/>
<p>Multiselect Dropdown:</p>
<Playground
  defaultValue={
`const options = [
{ label: 'Customer ID' },
{ label: 'Customer Name' },
{ label: 'Hold Date' },
{ label: 'Registration Date' },
];

<Dropdown
multiple
defaultValue={['Customer ID']}
title="Select Columns"
options={options}
onChange={console.log}
/>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={380}
  top
/>
<p>Dropdown can be filtered. Use space for 'and' and quotes for 'exact' match:</p>
<Playground
  defaultValue={
`const options = [
  { label: 'Customer ID' },
  { label: 'Customer Name' },
  { label: 'Hold Date' },
  { label: 'Registration Date' },
];

<Dropdown
  title="Select"
  filter
  options={options}
/>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={380}
  top
/>

<p>Custom filter function e.g. filter on all keys not just label</p>
<Playground
  defaultValue={
`const options = [
  {
    id: '9876',
    label: 'James',
    lastName: 'Smith',
  },
  {
    id: '2234',
    label: 'Phil',
    lastName: 'Jones',
  },
  {
    id: '1009',
    label: 'Mike',
    lastName: 'Doe',
  },
];

const filterFn = str => option =>
  Object
    .values(option)
    .join(' ')
    .toLowerCase()
    .indexOf(str.toLowerCase()) !== -1;

<Dropdown
  title="Select"
  options={options}
  filter
  filterFn={filterFn}
/>
`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={380}
  top
/>

<p>noWrap causes long labels to appear on one line with ellipsis if too long:</p>
<Playground
  defaultValue={
`const options = [
  { label: 'Customer ID' },
  { label: 'Customer Middle Name or Initials' },
  { label: 'Hold Date' },
  { label: 'Registration Date' },
];

<div>
  wrapped
  <Dropdown
    title="Select"
    options={options}
    width={150}
  />
  <p />
  noWrap
  <Dropdown
    noWrap
    title="Select"
    options={options}
    width={150}
  />
</div>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={420}
  top
/>

<p>onGray use a white box</p>
<Playground
  defaultValue={
`<Dropdown
  onGray
  title="Select"
  options={[{ label: 'Customer ID' }]}
/>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={120}
  top
/>

<p>Split Box style</p>
<Playground
  defaultValue={
`<DropdownSplit
  title="Select"
  options={[{ label: 'Customer ID' }]}
/>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={120}
  top
/>

<p>Link style</p>
<Playground
  defaultValue={
`<DropdownLink
  multiple
  title="Select"
  options={[{ label: 'Customer ID' }]}
/>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={120}
  top
/>

<p>Controlled Dropdown</p>
<Playground
  defaultValue={
`const options = [
  { label: 'Customer ID' },
  { label: 'Customer Name' },
  { label: 'Hold Date' },
  { label: 'Registration Date' },
];

class CtrlDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = ({ value: options[2] })
  }

  render() {
    const { checked } = this.state
    const { onCheck } = this
    return (
      <div>
        <pre>{
          this.state.value.label
        }</pre>
        <Dropdown
          title="Select"
          value={this.state.value}
          options={options}
          onChange={value => this.setState({ value })}
        />
      </div>
    )
  }
}

<CtrlDropdown />`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={380}
  top
/>

<p>Controlled multiselect Dropdown</p>
<Playground
  defaultValue={
`const options = [
  { label: 'Customer ID' },
  { label: 'Customer Name' },
  { label: 'Hold Date' },
  { label: 'Registration Date' },
];

class CtrlDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = ({ value: options.slice(0,2) })
  }

  render() {
    const { checked } = this.state
    const { onCheck } = this
    return (
      <div>
        <pre style={{height: 60}}>{
          this.state.value
            .map(({label}) => label)
            .join('\\n')
        }</pre>
        <Dropdown
          multiple
          title="Select"
          value={this.state.value}
          options={options}
          onChange={value => this.setState({ value })}
        />
      </div>
    )
  }
}

<CtrlDropdown />`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={420}
  top
/>

<H2>Dropdown Props</H2>
<p>Options are objects which must have a label key.
They can have other keys which may be used by custom filters
or onChange handlers.</p>

<p>When using `multiple` all values and onChange handlers use an array of options.
Otherwise they use a single option object. Note options
use reference equality so you must use the same instance in the
options array as a value and not a new instance with equal keys and values.</p>
<PropsDocs src={src} />

</DocPage>
)

export default PageHeaderPage
