import React, { useMemo, useState } from 'react'
import { Box } from '../../ui/components'
import theme from '../../ui/theme'
import { Label, StyledInput, Table, TableRow, Title, Value, ValueContainer } from './styles'

interface IMemoryProps {
  memory: number[]
}

export const Memory = ({ memory }: IMemoryProps) => {
  const [memoryIndex, setMemoryIndex] = useState('')

  return (
    <Box>
      <Box flexDirection='row' bg={theme.colors.brand_primary} alignItems='center' justifyContent='space-between'>
        <Title>MEMÓRIA</Title>

        <Box flexDirection='row' alignItems='center'>
          <Label>Endereço base:</Label>
          <StyledInput value={memoryIndex} type='number' onChange={(e) => setMemoryIndex(e.target.value)}/>
        </Box>
      </Box>

      <Box p={'16px'}>
        <Box bg={theme.colors.brand_primary} borderRadius={'8px'} p={'16px'}>
          <ValueContainer>
            <Label>Endereço</Label>
            <Value>Valor</Value>
          </ValueContainer>

          <Table>
            <TableRow>
              <Box flex={0.18} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}></Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>00</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>01</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>02</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>03</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>04</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>05</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>06</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>07</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>08</Box>
              <Box flex={0.09} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>09</Box>
            </TableRow>
              {new Array(5).fill(0).map((_, rowNumber) => (
                <TableRow key={rowNumber}>
                  <Box flex={0.18} style={{ color: theme.colors.brand_secondary, fontWeight: 'bold' }}>{+memoryIndex + +rowNumber * 10}</Box>
                  {new Array(10).fill(0).map((_, index) => (
                    <Box key={index} flex={0.09}>{memory[+memoryIndex + +(rowNumber * 10) + +index]}</Box>
                  ))}
                </TableRow>
              ))}
          </Table>
        </Box>
      </Box>
    </Box>
  )
}