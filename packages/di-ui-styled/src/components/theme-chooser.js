import React from 'react'
import * as themes from '../../src/themes'
import { getContext } from 'recompose'

const ThemeChooser = ({
  themeChooser: { onChangeTheme, theme },
}) => (
  <select
    onChange={({ target }) => onChangeTheme(themes[target.value])}
    value={theme.key}
  >
    {Object.values(themes).map(({ key, displayName }) => (
      <option key={key} value={key}>{displayName || key}</option>
    ))}
  </select>
)

const enhance = getContext({
  themeChooser: React.PropTypes.shape({
    theme: React.PropTypes.object,
    onChangeTheme: React.PropTypes.func,
  }),
})

export default enhance(ThemeChooser)
