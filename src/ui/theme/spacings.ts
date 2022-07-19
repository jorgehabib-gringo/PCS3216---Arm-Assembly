const spacing = {
  vertical: {
    spacing_ver_xxxs: '2px',
    spacing_ver_xxs: '4px',
    spacing_ver_xs: '8px',
    spacing_ver_sm: '16px',
    spacing_ver_md: '24px',
    spacing_ver_lg: '32px',
    spacing_ver_xl: '40px',
    spacing_ver_xxl: '48px',
    spacing_ver_xxxl: '80px',
    spacing_ver_giant: '160px',
  },
  horizontal: {
    spacing_hor_xs: '8px',
    spacing_hor_sm: '16px',
    spacing_hor_md: '24px',
    spacing_hor_lg: '32px',
    spacing_hor_xl: '40px',
    spacing_hor_xxl: '48px',
  },
} as const

type VerticalSpacingDesignSystemKeys = keyof typeof spacing.vertical
type VerticalSpacingDesignSystemValues = typeof spacing.vertical[VerticalSpacingDesignSystemKeys]
type HorizontalSpacingDesignSystemKeys = keyof typeof spacing.horizontal
type HorizontalSpacingDesignSystemValues = typeof spacing.horizontal[HorizontalSpacingDesignSystemKeys]
export type SpacingDesignSystemValues = VerticalSpacingDesignSystemValues | HorizontalSpacingDesignSystemValues | 'auto'

export default spacing
