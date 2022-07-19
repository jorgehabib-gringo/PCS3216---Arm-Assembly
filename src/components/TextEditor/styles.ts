import styled from 'styled-components'
import theme from '../../ui/theme'

export const TextEditorArea = styled.textarea`
  flex: 1;
  height: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  background-color: ${theme.colors.brand_primary};
  border: 0;
  color: ${theme.colors.neutral_white};
  line-height: 18px;
  overflow-y: scroll;
`

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: ${theme.colors.brand_primary};
  border: 0;
  color: ${theme.colors.neutral_white};
  overflow-y: scroll;
`

export const LineCounterContainer = styled.div`
  height: 100%;
  width: 3%;
  padding: 12px 0px;
  box-sizing: border-box;
  background-color: ${theme.colors.brand_primary};
  border: 0;
  color: ${theme.colors.neutral_white};

  font-size: 12px;
  
  display: flex;
  flex-direction: column;
`

export const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 18px;
  height: 100%;
  /* font-size: 10px; */
  color: ${theme.colors.brand_secondary};
`