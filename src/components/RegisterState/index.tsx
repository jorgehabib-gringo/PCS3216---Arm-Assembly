import React from 'react'
import { IRegisterBank } from '../../core/models/CPU'
import { Box } from '../../ui/components'
import theme from '../../ui/theme'
import { Label, Title, Value, ValueContainer } from './styles'

interface IRegisterStateProps {
  registerBank: IRegisterBank
}

export const RegisterState = ({ registerBank }: IRegisterStateProps) => {
  return (
    <Box>
      <Box bg={theme.colors.brand_primary} p={'16px'}>
        <Title>ESTADO DOS REGISTRADORES</Title>
      </Box>

      <Box p={'16px'}>
        <Box bg={theme.colors.brand_primary} borderRadius={'8px'} p={'16px'}>
          <ValueContainer>
            <Label>Registrador</Label>
            <Value>Binário</Value>
          </ValueContainer>
          <Box flexDirection='row' justifyContent='space-between'>
            <Box w='100%'>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r0</Label>
                <Value>{registerBank.r0}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r1</Label>
                <Value>{registerBank.r1}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r2</Label>
                <Value>{registerBank.r2}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r3</Label>
                <Value>{registerBank.r3}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r4</Label>
                <Value>{registerBank.r4}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r5</Label>
                <Value>{registerBank.r5}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r6</Label>
                <Value>{registerBank.r6}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r7</Label>
                <Value>{registerBank.r7}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r8</Label>
                <Value>{registerBank.r8}</Value>
              </Box>
            </Box>
            <Box w='100%'>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r9</Label>
                <Value>{registerBank.r9}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r10</Label>
                <Value>{registerBank.r10}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r11</Label>
                <Value>{registerBank.r11}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>r12</Label>
                <Value>{registerBank.r12}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>PC</Label>
                <Value>{registerBank.pc}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>SP</Label>
                <Value>{registerBank.sp}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>LR</Label>
                <Value>{registerBank.lr}</Value>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}