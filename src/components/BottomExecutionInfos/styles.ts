import styled from 'styled-components'
import theme from '../../ui/theme'

export const Title = styled.h2`
  font-size: 16px;
`

export const Button = styled.button`
  background: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${theme.colors.neutral_white};

  margin-bottom: 8px;

  > svg {
    margin-right: 8px;
  }
`

export const ConfigButton = styled.button`
  margin-bottom: 8px;
  background: ${theme.colors.brand_primary};
  color: ${theme.colors.neutral_white};
  font-weight: bold;
  padding: 4px;
  font-size: 12px;

  box-sizing: border-box;

  border: 1px solid ${theme.colors.brand_primary};

  &:hover {
    border: 1px solid ${theme.colors.status_critical}
  }
`
