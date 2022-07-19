import { ColorDesignSystemValues } from '../../theme/colors'
import styled from 'styled-components'

export interface BoxProps {
  pt?: any
  pb?: any
  pl?: any
  pr?: any
  bg?: ColorDesignSystemValues | 'transparent'
  px?: any
  py?: any
  p?: any
  m?: any
  mt?: any
  mb?: any
  ml?: any
  mr?: any
  mx?: any
  my?: any
  h?: any | string
  minHeight?: any | string
  w?: any | string
  flex?: string | number
  flexGrow?: number
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | undefined
  borderRadius?: string
  borderColor?: ColorDesignSystemValues
  borderWidth?: number
  borderBottom?: any
}

export const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;

  ${(p) => p.bg && `background-color: ${p.bg}`};

  ${(p) => p.borderBottom && `border-bottom: ${p.borderBottom}`};

  ${(p) => p.flex && `flex: ${p.flex};`}
  ${(p) => p.flexDirection && `flex-direction: ${p.flexDirection}`};
  ${(p) => p.flexGrow && `flex-grow: ${p.flexGrow}`};
  ${(p) => p.justifyContent && `justify-content: ${p.justifyContent}`};
  ${(p) => p.alignItems && `align-items: ${p.alignItems}`};

  ${(p) => p.h && `height: ${p.h}`};
  ${(p) => p.w && `width: ${p.w};`}
  ${(p) => p.minHeight && `min-height: ${p.minHeight};`}

  ${(p) => p.borderRadius && `border-radius: ${p.borderRadius}`};
  ${(p) => p.borderColor && `border-color: ${p.borderColor}`};
  ${(p) => p.borderWidth && `border-width: ${p.borderWidth}px`};

  ${(p) => p.m && `margin: ${p.m}`};
  ${(p) => p.mb && `margin-bottom: ${p.mb}`};
  ${(p) => p.ml && `margin-left: ${p.ml}`};
  ${(p) => p.mr && `margin-right: ${p.mr}`};
  ${(p) => p.mt && `margin-top: ${p.mt}`};
  ${(p) => p.mx && `margin-horizontal: ${p.mx}`};
  ${(p) => p.my && `margin-vertical: ${p.my}`};

  ${(p) => p.p && `padding: ${p.p}`};
  ${(p) => p.pb && `padding-bottom: ${p.pb}`};
  ${(p) => p.pl && `padding-left: ${p.pl}`};
  ${(p) => p.pr && `padding-right: ${p.pr}`};
  ${(p) => p.pt && `padding-top: ${p.pt}`};
  ${(p) => p.px && `padding-horizontal: ${p.px}`};
  ${(p) => p.py && `padding-vertical: ${p.py}`};
`
