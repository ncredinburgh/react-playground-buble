import defaultTheme from '../themes/default-theme'

export const fromTheme = name => ({ theme }) =>
  theme && theme[name] ? theme[name] : defaultTheme[name]
