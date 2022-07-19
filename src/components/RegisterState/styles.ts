import styled from 'styled-components'
import theme from '../../ui/theme'

export const Label = styled.span`
  font-size: 12px;
  color: ${theme.colors.brand_secondary};
  font-weight: bold;
`

export const Title = styled.h2`
  font-size: 12px;
`

export const Value = styled.span`
  font-size: 12px;
`

export const ValueContainer = styled.div`
  align-self: flex-start; 
  justify-content: space-between;
  width: 200px;
  display: flex;
  border-bottom: 1px solid ${theme.colors.neutral_white};
  margin-bottom: 16px;
`