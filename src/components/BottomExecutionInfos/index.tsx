import React, { useRef } from 'react'
import { Box } from '../../ui/components'
import { Button, ConfigButton, Title } from './styles'
import { FiPlayCircle, FiChevronRight, FiChevronsRight, FiX} from 'react-icons/fi';
import theme from '../../ui/theme';

interface BottomExecutionInfosProps {
  code: string
  run(): void
  setCode(s: string): void
  onClickRun(s: string): void
}

export const BottomExecutionInfos = ({ onClickRun, code, run, setCode }: BottomExecutionInfosProps) => {  
  const hiddenFileInput = useRef<any>()
  const hiddenFileInputToExecute = useRef<any>()
  
  const handleDownload = () => {
    const filename = 'index.s'
    const text = code

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  const handleAbsoluteMount = () => {
    const filename = 'index.exe'
    const text = code

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  const handleOpenFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e: any) {
        const text = e.target.result;
        setCode(text)
    }

    reader.readAsText(file);
  }

  const handleOpenFileExecutable = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e: any) {
        const text = e.target.result;
        onClickRun(text)
        setCode('')
    }

    reader.readAsText(file);
  }

  const handleClick = () => {
    hiddenFileInput.current.click();
  }

  const handleExecute = () => {
    hiddenFileInputToExecute.current.click();
  }
  

  return (
    <Box flexDirection='row'>
      <Box flex={0.65} p={'16px'}>
        <Box mb={'16px'} flexDirection='row' alignItems='center' justifyContent='space-between'>
          <Title>Execução</Title>
          <span style={{ fontSize: 12 }}>Arquivo: Meu Arquivo ARM</span>
        </Box>

        <Box>
          <Button onClick={run}>
            <FiPlayCircle color={theme.colors.status_success} />
            <span><strong>Rodar programa</strong></span>
          </Button>

          <Button>
            <FiChevronRight color={theme.colors.status_alert} />
            <span>Step</span>
          </Button>

          <Button>
            <FiChevronsRight color={theme.colors.status_alert} />
            <span>Ignorar breakpoints</span>
          </Button>

          <Button>
            <FiX color={theme.colors.status_alert} />
            <span>Cancelar</span>
          </Button>
        </Box>

        <Box mt={'16px'}>
          <span>Instrução a ser executada</span>
          <Box mt={'8px'} bg={theme.colors.brand_primary} p={'8px'}>
            <p>LDR r3, =0x8000</p>
          </Box>
        </Box>
      </Box>
      <Box flex={0.01} bg={theme.colors.brand_primary}/>
      <Box flex={0.34} p={'16px'}>
        <Title>Execução</Title>
        <Box mb={'16px'}/>

        <ConfigButton onClick={handleDownload}>Armazenar código</ConfigButton>
        <ConfigButton onClick={handleClick}>
          Carregador código
        </ConfigButton>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleOpenFile}
          style={{display: 'none'}}
        />
        <ConfigButton onClick={() => handleAbsoluteMount()}>Montagem absoluta</ConfigButton>
        <ConfigButton onClick={() => alert('Por favor, utilize a versão desktop para utilizar essa função')}>Montagem relocável</ConfigButton>
        <ConfigButton onClick={() => alert('Por favor, utilize a versão desktop para utilizar essa função')}>Ligação</ConfigButton>
        <ConfigButton onClick={handleExecute}>Executar Programa (.exe)</ConfigButton>
        <input
          type="file"
          ref={hiddenFileInputToExecute}
          onChange={handleOpenFileExecutable}
          style={{display: 'none'}}
        />
      </Box>
    </Box>
  )
}