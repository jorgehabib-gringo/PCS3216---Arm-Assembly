import styled from 'styled-components'
import theme from '../../ui/theme'

export const Label = styled.span`
  font-size: 16px;
  color: ${theme.colors.brand_secondary};
`

export const Title = styled.h2`
  font-size: 16px;
  padding: 16px;
`

export const Value = styled.span`
  font-size: 16px;
`

export const ValueContainer = styled.div`
  align-self: flex-start; 
  justify-content: space-between;
  width: 200px;
  display: flex;
  border-bottom: 1px solid ${theme.colors.neutral_white};
  margin-bottom: 16px;
`

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`

export const TableRow = styled.div`
  display: flex;
  font-size: 12px;
  flex-wrap: wrap;
`

export const StyledInput = styled.input`
  border: 0;
  border: solid 2px ${theme.colors.brand_primary};
  color: ${theme.colors.neutral_white};
  background: ${theme.colors.brand_primary_dark};
  padding: 16px;
  margin-left: 8px;
`
