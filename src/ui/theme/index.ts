import colors from './colors'
import spacings from './spacings'
import shadows from './shadows'
import radius from './radius'
import opacity from './opacity'
import typography from './typography'

export type ColorTypes = keyof typeof colors

const theme = {
  colors,
  spacings,
  shadows,
  radius,
  opacity,
  typography,
}
export type ThemeType = typeof theme
export default theme
