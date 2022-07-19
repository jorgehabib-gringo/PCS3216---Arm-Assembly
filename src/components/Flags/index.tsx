import React from 'react'
import { IFlagsBank } from '../../core/models/CPU'
import { Box } from '../../ui/components'
import theme from '../../ui/theme'
import { Label, Title, Value, ValueContainer } from './styles'

interface IFlagsProps {
  flags: IFlagsBank
}

export const Flags = ({ flags }: IFlagsProps) => {
  return (
    <Box>
      <Box bg={theme.colors.brand_primary} p={'16px'}>
        <Title>FLAGS DA CPU</Title>
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
                <Label>EQ</Label>
                <Value>{(JSON.stringify(flags.EQ).toUpperCase())}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>NE</Label>
                <Value>{JSON.stringify(flags.NE).toUpperCase()}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>LT</Label>
                <Value>{JSON.stringify(flags.LT).toUpperCase()}</Value>
              </Box>
            </Box>
            <Box w='100%'>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>LE</Label>
                <Value>{JSON.stringify(flags.LE).toUpperCase()}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>GT</Label>
                <Value>{JSON.stringify(flags.GT).toUpperCase()}</Value>
              </Box>
              <Box flexDirection='row' w={'80%'} justifyContent='space-between' mb={'8px'} borderBottom={`1px solid ${theme.colors.neutral_white}`} pb={'4px'}>
                <Label>GE</Label>
                <Value>{JSON.stringify(flags.GE).toUpperCase()}</Value>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}