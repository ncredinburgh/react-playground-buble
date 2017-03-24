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
defaultValue={[options[1]]}
title="Select Columns"
options={options}
onChange={console.log}
/>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={380}
  top
/>

<p>`getOptionValue` is a mapping functions telling the
dropdown how to recognise items represented by `value` and `defaultValue`.
Think of it as function to specify a primary key.
`option[i]` is selected if `value === getOptionValue(option[i])` or for multiselect
if `value.includes(getOptionValue(option[i]))`
By default `getOptionValue` is `x => x` that is to say string options would be
recognised by value equality, but objects by reference equality
(often not what you want). If you want to recognise options by a property
specify the property e.g. `getOptionValue = x => x.animal`.</p>

<p>`getLableValue` maps an option to its label. By default `getLableValue` will
map an object to its `label` property `x => x.label` and a non-object (e.g. a string or number) as
itself `x => x`.</p>

<p>Note that `onChange` always returns the full
option item. Use destructuring if you only need a single property.</p>

<Playground
  defaultValue={
`const options = [
{ animal: 'dog' },
{ animal: 'cat' },
];

<Dropdown
multiple
defaultValue={['cat']}
getOptionValue={x => x.animal}
getOptionLabel={x => \`* \${x.animal.toUpperCase()\} *\`}
title="Select Columns"
options={options}
onChange={({ animal }) => console.log(animal)}
/>`
  }
  scope={{ Dropdown, DropdownSplit, DropdownLink }}
  minHeightViewer={380}
  top
/>

<p>
This means for simple cases you can do have options as array of strings and the
value of each item will be mapped to both the label and the value.
</p>

<Playground
  defaultValue={
`const options = ['cat', 'dog'];

<Dropdown
multiple
defaultValue={['cat']}
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

<p>`small` versions available</p>
<Playground
  defaultValue={
`<div style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 350
 }}>
  <DropdownLink
    small
    title="Select"
    options={[{ label: 'Customer ID' }]}
  />
  <Dropdown
    small
    title="Select"
    options={[{ label: 'Customer ID' }]}
  />

  <Dropdown
    onGray
    small
    title="Select"
    options={[{ label: 'Customer ID' }]}
  />

  <DropdownSplit
    small
    title="Select"
    options={[{ label: 'Customer ID' }]}
  />
</div>`
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
