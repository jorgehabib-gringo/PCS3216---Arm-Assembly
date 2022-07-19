import { Instruction } from "./Instruction";

export interface IRegisterBank {
  [key: string]: number
}

export interface ILabelBank {
  [key: string]: number
}

export interface IFlagsBank {
  [key: string]: boolean
}

export interface IInternalVariable {
  [key: string]: {
    index: number
    length: number
  }
}

export const REGISTER_NAMES = ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'pc', 'sp', 'lr']

export const FLAGS_NAMES = ['EQ', 'NE', 'GE', 'LE', 'LT', 'GT']

export const MEMORY_SPACES_KEYWORDS = ['.word', '.space']

class CPU {
  private registerBank: IRegisterBank

  private labels: ILabelBank

  private flags: IFlagsBank

  private internalVariables: IInternalVariable

  private isInterrupted: boolean

  constructor() {
    this.registerBank = {
      r0: 0,
      r1: 0,
      r2: 0,
      r3: 0,
      r4: 0,
      r5: 0,
      r6: 0,
      r7: 0,
      r8: 0,
      r9: 0,
      r10: 0,
      r11: 0,
      r12: 0,
      r13: 0,
      r14: 0,
      r15: 0,
      r16: 0,
      pc: 0,
      sp: 4000,
      lr: 0,
    }
    
    this.labels = {}

    this.flags = {
      EQ: false,
      NE: false,
      GE: false,
      LE: false,
      LT: false,
      GT: false,
    }

    this.isInterrupted = false

    this.internalVariables = {}
  }

  decodeInstruction(rawInstruction: string) {
    console.log('DECODING INSTRUCTION')
    const instruction = new Instruction(rawInstruction)

    console.log('DECODED INSTRUCTION:', instruction)

    return instruction
  }

  readLabelsAndMemorySpacesDeclaration(rawInstructions: string[], memory: number[]) {
    let freeSpaceIndex = 0
    const tempLabels = {} as ILabelBank

    rawInstructions.forEach((instruction, index) => {
      if (instruction.includes(':')) {
        const labelName = instruction.replace(':', '')
        const spaceKeyword = rawInstructions[index + 1].split(' ')[0]
        const spaceOrValues = rawInstructions[index + 1].replace(rawInstructions[index + 1].split(' ')[0], '')

        if (MEMORY_SPACES_KEYWORDS.includes(spaceKeyword)) {
          if (spaceKeyword === MEMORY_SPACES_KEYWORDS[0]) {
            const values = spaceOrValues.split(',').map(s => s.trim())
            
            values.forEach((v, index) => {
              memory[freeSpaceIndex + index] = Number(v)
            })
            
            this.internalVariables[labelName] = {
              index: freeSpaceIndex,
              length: values.length
            }

            freeSpaceIndex += values.length
          } else if (spaceKeyword === MEMORY_SPACES_KEYWORDS[1]) { 
            this.internalVariables[labelName] = {
              index: freeSpaceIndex,
              length: Number(spaceOrValues)
            }

            freeSpaceIndex += Number(spaceOrValues)
          }
        } else {
          tempLabels[labelName] = index + 1
        }
      }
    })

    this.labels = tempLabels
  }

  executeInstruction(instruction: Instruction, memory: number[]) {
    if (this.isInterrupted) {
      return
    }

    console.log('EXECUTING INSTRUCTION')
    const isBranch = instruction.execute({
      registerBank: this.registerBank, 
      memory, 
      labels: this.labels,
      flags: this.flags,
      setIsInterrupted: () => this.isInterrupted = true,
      internalVariables: this.internalVariables
    })

    return isBranch
  }

  resetCPU() {
    this.registerBank = {
      r0: 0,
      r1: 0,
      r2: 0,
      r3: 0,
      r4: 0,
      r5: 0,
      r6: 0,
      r7: 0,
      r8: 0,
      r9: 0,
      r10: 0,
      r11: 0,
      r12: 0,
      r13: 0,
      r14: 0,
      r15: 0,
      r16: 0,
      pc: 0,
      sp: 4000,
      lr: 0,
    }
    
    this.labels = {}

    this.flags = {
      EQ: false,
      NE: false,
      GE: false,
      LE: false,
      LT: false,
      GT: false,
    }

    this.isInterrupted = false

    this.internalVariables = {}
  }

  getRegisterBank() {
    return this.registerBank
  }

  getFlags() {
    return this.flags
  }


  getIsInterrupted() {
    return this.isInterrupted
  }

  updatePC(newPc: number) {
    this.registerBank.pc = newPc
  }
}

export { CPU }
