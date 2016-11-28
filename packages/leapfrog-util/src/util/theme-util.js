import {
  fromCss,
  lighten,
  darken,
  toCss,
} from 'color-array'

export const fromTheme = propName =>
  ({ theme }) => theme[propName]

export const getUseLightAccent = fromTheme('useLightAccent')
export const getAccentPercent = fromTheme('accentPercent')
export const getSectionAColor = fromTheme('sectionAColor')
export const getSectionATextColor = fromTheme('sectionATextColor')
export const getSectionATextStyle = fromTheme('sectionATextStyle')
export const getSectionBColor = fromTheme('sectionBColor')
export const getSectionBTextColor = fromTheme('sectionBTextColor')
export const getSectionCColor = fromTheme('sectionCColor')
export const getSectionDColor = fromTheme('sectionDColor')
export const getSectionDTextColor = fromTheme('sectionDTextColor')
export const getSectionEColor = fromTheme('sectionEColor')
export const getSectionETextColor = fromTheme('sectionETextColor')
export const getSectionFColor = fromTheme('sectionFColor')
export const getSectionFTextColor = fromTheme('sectionFTextColor')
export const getSectionGColor = fromTheme('sectionGColor')
export const getSectionGImage = fromTheme('sectionGImage')
export const getSectionHColor = fromTheme('sectionHColor')
export const getSectionHTextColor = fromTheme('sectionHTextColor')
export const getFooterDiLogoHide = fromTheme('footerDiLogoHide')

// themeLighten(sectionAColor, 0.25)
export const lightenThemeColor = (callback, amount) => props =>
  lightenCssColor(callback(props), amount)

export const darkenThemeColor = (callback, amount) => props =>
  darkenCssColor(callback(props), amount)

export const lightenCssColor = (color, amount) =>
  toCss(lighten(fromCss(color), amount))

export const darkenCssColor = (color, amount) =>
  toCss(darken(fromCss(color), amount))
