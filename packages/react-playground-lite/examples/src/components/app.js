// @flow

import React from 'react'
import {
  ReactPlaygroundLite,
} from '../../../src'

const defaultJsx = `<div className="Edit">
  <button>Hello</button>
</div>`

const App = () => (
  <ReactPlaygroundLite defaultValue={defaultJsx} />
)

export default App
