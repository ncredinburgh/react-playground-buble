import React from 'react'
import * as themes from '../../src/themes'
import { getContext } from 'recompose'

const ThemeChooser = ({ themeEmitter: { themeEmitter, theme } }) => (
  <select
    onChange={({ target }) => {
      themeEmitter.emit('change', themes[target.value])
    }}
    value={theme.key}
  >
    {
      Object.values(themes).map(({ key, displayName }) => (
        <option key={key} value={key}>{displayName || key}</option>
      ))
    }
  </select>
)

const enhance = getContext({
  themeChooser: React.PropTypes.object({
    theme: React.PropTypes.object,
    themeEmitter: React.PropTypes.func,
  }),
})

export default enhance(ThemeChooser)
