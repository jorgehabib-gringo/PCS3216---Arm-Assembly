import React, { useRef, useState } from 'react';
import { BottomExecutionInfos } from './components/BottomExecutionInfos';
import { Header } from './components/Header';
import { TextEditor } from './components/TextEditor';
import { CPU } from './core/models/CPU';
import { Box } from './ui/components';
import { FileSystem } from './components/FileSystem'
import { RegisterState } from './components/RegisterState';
import theme from './ui/theme';
import { Memory } from './components/Memory';
import { Stack } from './components/StackFD';
import { cp } from 'fs';
import { Flags } from './components/Flags';

const App = () => {
  const MEMORY_SIZE = 4000

  const [code, setCode] = useState('main:\n LDR r1, =12\n ADR r0, dados\n BL bubble_sort\n B fim\nbubble_sort:\n STMFD sp!, {r1, r2, r3, r4, r5, lr}\n MOV r2, r1\nbubble_loop_1:\n MOV r3, #0\nbubble_loop_2:\n ADD r5, r0, r3\n ADD r3, r3, #1\n CMP r3, r2\n BGE bubble_loop_2_done\n\n BL check_next\n CMP r6, #0\n BLNE swap_next\n B bubble_loop_2\n\nbubble_loop_2_done:\n SUB r2, r2, #1\n CMP r2, #0\n BNE bubble_loop_1\n\nbubble_loop_1_done:\n LDMFD sp!, {r1, r2, r3, r4, r5, lr}\n MOV pc, lr\ncheck_next:\n STMFD sp!, {r1, r2, lr}\n LDMIA r5, {r1, r2}\n CMP r1, r2\n MOVGT r6, #1\n MOVLE r6, #0 \n LDMFD sp!, {r1, r2, lr}\n MOV pc, lr\n\nswap_next:\n STMFD sp!, {r1, r2, r3, lr}\n LDMIA r5, {r1, r2}\n MOV r3, r1\n MOV r1, r2\n MOV r2, r3\n STMIA r5, {r1, r2}\n LDMFD sp!, {r1, r2, r3, lr}\n MOV pc, lr\n\nfim:\n SWI 0x123456\n\ndados:\n .word 4,7,2,6,1,9,8,15,5,58,12,4\n\nsort_stack:\n .space 100');
  const [cpu, setMainCpu] = useState(new CPU());
  const [memory, setMainMemory] = useState(new Array(MEMORY_SIZE).fill(0));

  const [_, refreshInfos] = useState(false)

  const areaRef = useRef<any>()

  const refresh = () => refreshInfos(!_)

  const onClickRun = (rawCode: string) => {
    const code = rawCode

    cpu.resetCPU()

    // fetch
    // decode
    // execute 
    // memory
    // write back

    const mem = new Array(MEMORY_SIZE).fill(0)

    const rawInstructions = code.split('\n').map(x => x.trim());
    console.log(`INSTRUCTIONS: ${rawInstructions.length}`)

    let tempPC = 0
    cpu.updatePC(tempPC)
    cpu.readLabelsAndMemorySpacesDeclaration(rawInstructions, mem)

    while (tempPC < rawInstructions.length) {
      let newPC = tempPC + 1

      const rawInstruction = rawInstructions[tempPC]
      
      // DECODE
      const instruction = cpu.decodeInstruction(rawInstruction);
      
      // EXECUTE
      const isBranch = cpu.executeInstruction(instruction, mem);
      
      // MEMORY ACCESS
  
  
      // WRITE BACK
      setMainMemory(mem)
      refresh()
      
      if (isBranch) {
        tempPC = cpu.getRegisterBank().pc
      } else {
        tempPC = newPC
      }
      cpu.updatePC(tempPC)
    }
  }

  console.log(cpu)

  return (
    <Box flexDirection='row' h={'100vh'}>
      <Box h={'100%'} flex={0.6}>
        <Header />

        <TextEditor numberOfLines={code.split('\n').length} setCode={setCode} code={code}/>

        <BottomExecutionInfos setCode={setCode} run={() => onClickRun(code)} code={code} onClickRun={onClickRun}/>
      </Box>
      <Box flex={0.003} bg={theme.colors.status_critical} />
      <Box flex={0.397} style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
        <FileSystem />
        <RegisterState registerBank={cpu.getRegisterBank()} />
        <Memory memory={memory}/>
        <Stack memory={memory} sp={cpu.getRegisterBank().sp < 4000 ? cpu.getRegisterBank().sp : 3999} />
        <Flags flags={cpu.getFlags()} />
      </Box>
    </Box>
  );
}

export default App;
