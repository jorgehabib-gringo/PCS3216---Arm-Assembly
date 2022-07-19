import React, { useMemo, useState } from 'react'
import { Box } from '../../ui/components'
import theme from '../../ui/theme'
import { Label, Table, TableRow, Title, Value, ValueContainer } from './styles'

interface IStackProps {
  memory: number[]
  sp: number
}

export const Stack = ({ memory, sp }: IStackProps) => {
  return (
    <Box>
      <Box flexDirection='row' bg={theme.colors.brand_primary}>
        <Title>PILHA - FULL DESCENDING</Title>
      </Box>

      <Box p={'16px'}>
        <Box bg={theme.colors.brand_primary} borderRadius={'8px'} p={'16px'}>
          <ValueContainer>
            <Label>Endereço</Label>
            <Value>Valor</Value>
          </ValueContainer>

          <Table>
            <TableRow>
              {new Array(4000 - sp).fill(0).map((_, rowNumber) => (
                <Box flex={1} mr={'8px'} mb={'8px'} key={rowNumber}>
                  <Box style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>{4000 - rowNumber}</Box>
                  <Box>
                    <span>{memory[rowNumber]}</span>
                  </Box>
                </Box>
              ))}
            </TableRow>
          </Table>
        </Box>
      </Box>
    </Box>
  )
}