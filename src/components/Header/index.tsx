import React from 'react'
import { Box } from '../../ui/components'
import theme from '../../ui/theme'

import { FileIcon, FileTitle, Title } from './styles'

export const Header = () => {
  return (
    <Box flexDirection={'row'} bg={theme.colors.brand_primary_dark} alignItems={'center'}>
      <Title>Pseudo-Arm Programming Language</Title>

      <Box p={'12px'} bg={theme.colors.brand_primary} alignItems={'center'} flexDirection={'row'}>
        <FileIcon>[s]</FileIcon>
        <FileTitle>Meu Arquivo ARM</FileTitle>
      </Box>
    </Box>
  )
}