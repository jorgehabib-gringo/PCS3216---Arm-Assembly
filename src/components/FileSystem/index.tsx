import React from 'react'
import { Box } from '../../ui/components'
import theme from '../../ui/theme'
import { FileTitle } from '../Header/styles'
import { Button, FileIcon, Title } from './styles'

export const FileSystem = () => {
  return (
    <Box>
      <Box p={'12px'} flexDirection='row' bg={theme.colors.brand_primary} alignItems='center' justifyContent='space-between'>
        <Box ml={'8px'}>
          <Title>ARQUIVOS</Title>
        </Box>
        <Box mr={'8px'}>
          <Button>Carregar arquivo</Button>
        </Box>
      </Box>

      <Box p={'16px'}>
        <Box p={'12px'} borderRadius={'8px'} flexDirection='row' bg={theme.colors.brand_primary} alignItems={'center'} justifyContent='space-between'>
          <Box alignItems={'center'} flexDirection={'row'}>
            <FileIcon>[s]</FileIcon>
            <FileTitle>Meu Arquivo ARM</FileTitle>
          </Box>

          <Box>
            <Button>Salvar</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}