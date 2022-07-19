const colors = {
  brand_primary: '#191622',
  brand_primary_lightest: '#CFFFFF',
  brand_primary_light: '#65E1FF',
  brand_primary_dark: '#13111B',
  brand_primary_darkest: '#004E87',
  brand_secondary: '#D872AD',
  brand_secondary_lightest: '#FFFFEB',
  brand_secondary_light: '#FFFF52',
  brand_secondary_dark: '#FFC600',
  brand_secondary_darkest: '#FFBE00',
  neutral_white: '#FFFFFF',
  neutral_lightest: '#F5F5F6',
  neutral_light: '#E1E2E1',
  neutral_medium: '#9FA5AF',
  neutral_dark: '#454A53',
  neutral_darkest: '#131416',
  status_success: '#61D24F',
  status_success_light: '#F0FBE5',
  status_attention: '#FFBE00',
  status_attention_light: '#FFFFEB',
  status_alert: '#F76B40',
  status_alert_light: '#FFF0E2',
  status_error: '#DB002A',
  status_error_light: '#FFEBEE',
  status_critical: '#6651A3',
  status_critical_light: '#F6F3F9',
  status_info: '#004E87',
  status_info_light: '#CFFFFF',
  transparent: 'transparent',
} as const

type ColorDesignSystemKeys = keyof typeof colors
export type ColorDesignSystemValues = typeof colors[ColorDesignSystemKeys]

export default colors
