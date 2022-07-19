import { FLAGS_NAMES, IFlagsBank, IInternalVariable, ILabelBank, IRegisterBank, REGISTER_NAMES } from "./CPU";

const INSTRUCTION_CODES_TABLE = {
  MOV: '0000',
  SUB: '0001',
  ADD: '0010',
  MUL: '0011',
  B: '0100',
  BL: '0101',
  CMP: '0110',
  SWI: '0111',
  LDR:  '1000',
  STR:  '1001',
  ADR: '1010',
  STMFD: '1011',
  LDMFD: '1100',
  LDMIA: '1101',
  STMIA: '1110',
} as any

type IParameterType = 'REGISTER' | 'NUMBER' | 'LIST' | 'LABEL' | 'MEMORY ADDRESS' | 'INVALID'

interface Parameter {
  type: IParameterType;
  value: any
}

interface InstructionOperands {
  registerBank?: IRegisterBank
  memory?: number[]
  labels?: ILabelBank
  flags?: IFlagsBank
  setIsInterrupted?: () => void
  internalVariables?: IInternalVariable
}

class Instruction {
  private id: string

  private condition: string

  private shouldRecalculateAddr: boolean

  private parameters: Parameter[]

  constructor(str: string) {
    this.parameters = []

    if (!str) {
      this.id = '1111';
    } 
    
    console.log('CREATING INSTRUCTION: ', str)


    const shouldRecalculateAddr = str.split(' ').map((s) => s.replace(',', ''))[1] ? str.split(' ').map((s) => s.replace(',', ''))[1].includes('!') : false
    this.shouldRecalculateAddr = shouldRecalculateAddr

    const instructionCodes = str.split(' ').map((s) => s.replace(',', '').replace('!', ''))

    const op = instructionCodes[0]
    
    let isolateOp = op
    let flagCode = ''

    FLAGS_NAMES.forEach((flag) => {
      if (op.includes(flag) && !op.includes(':')) {
        isolateOp = op.replace(flag, '')
        flagCode = flag
      }
    })

    const opcode = INSTRUCTION_CODES_TABLE[isolateOp] || '1111'

    this.condition = flagCode
    this.id = opcode

    for (let i = 1; i < instructionCodes.length; i = i + 1) {
      const parameter = instructionCodes[i]
      if (REGISTER_NAMES.includes(parameter)) {
        this.parameters.push({
          type: 'REGISTER',
          value: parameter
        })
      } else if (parameter.includes('#') || parameter.includes('=')) { 
        const value = this.decodeNumberParameter(parameter)
        
        this.parameters.push({
          type: 'NUMBER',
          value,
        })
      } else if (parameter.includes('{') && parameter.includes('}')) {
        this.parameters.push({
          type: 'LIST',
          value: parameter.replace('{', '').replace('}', ''),
        })
      } else if (parameter.includes('{')) {
        const firstRegister = parameter.replace('{', '')
        
        const registerList = [firstRegister]

        for (let j = i + 1;!instructionCodes[j - 1].includes('}');) {
          const register = instructionCodes[j].replace('}', '')
          registerList.push(register)
          j = j + 1
          i = j
        }

        this.parameters.push({
          type: 'LIST',
          value: registerList,
        })
      } else if (parameter.includes('[') && parameter.includes(']')) {
        const baseAddressRegister = parameter.replace('[', '').replace(']', '')


        this.parameters.push({
          type: 'MEMORY ADDRESS',
          value: [baseAddressRegister],
        })
      } else if (parameter.includes('[')) {
        const baseAddress = parameter.replace('[', '')
        
        const addressRegister = baseAddress
        const offsetAddressRegister = instructionCodes[i + 1].replace(']', '')
        i = i + 1

        this.parameters.push({
          type: 'MEMORY ADDRESS',
          value: [addressRegister, offsetAddressRegister],
        })

      } else {
        this.parameters.push({
          type: 'LABEL',
          value: parameter,
        })
      }
    }
  }

  decodeNumberParameter(p: string): number {
    return +p.replace('=', '').replace('#', '')
  }

  execute({
    registerBank, 
    memory, 
    labels, 
    flags,
    setIsInterrupted,
    internalVariables
  }: InstructionOperands) {
    let isBranch = false

    if (this.condition) {
      if (flags && !flags[this.condition]) {
        return
      }
    }

    if (this.id === INSTRUCTION_CODES_TABLE.MOV) {
      this.executeMOV({ registerBank })

      if (this.parameters[0].value === 'pc') {
        isBranch = true
      }
    }

    if (this.id === INSTRUCTION_CODES_TABLE.SUB) {
      this.executeSUB({ registerBank })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.ADD) {
      this.executeADD({ registerBank })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.MUL) {
      this.executeMUL({ registerBank })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.B) {
      this.executeB({ registerBank, labels })
      isBranch = true
    }

    if (this.id === INSTRUCTION_CODES_TABLE.BL) {
      this.executeBL({ registerBank, labels })
      isBranch = true
    }

    if (this.id === INSTRUCTION_CODES_TABLE.CMP) {
      this.executeCMP({ registerBank, flags })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.SWI) {
      this.executeSWI({ setIsInterrupted })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.LDR) {
      this.executeLDR({ registerBank, memory })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.STR) {
      this.executeSTR({ registerBank, memory })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.ADR) {
      this.executeADR({ registerBank, internalVariables })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.STMFD) {
      this.executeSTMFD({ registerBank, memory })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.LDMFD) {
      this.executeLDMFD({ registerBank, memory })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.LDMIA) {
      this.executeLDMIA({ registerBank, memory })
    }

    if (this.id === INSTRUCTION_CODES_TABLE.STMIA) {
      this.executeSTMIA({ registerBank, memory })
    }

    if (this.shouldRecalculateAddr) {
      if (!registerBank) return

      if (this.id === INSTRUCTION_CODES_TABLE.STMFD || this.id === INSTRUCTION_CODES_TABLE.LDMFD) {
        registerBank.pc -= this.parameters[1].value.length
      }
  
  
      if (this.id === INSTRUCTION_CODES_TABLE.LDMIA || this.id === INSTRUCTION_CODES_TABLE.STMIA) {
        registerBank.pc += this.parameters[1].value.length
      }
    }

    return isBranch
  }

  executeMOV({ registerBank }: InstructionOperands) {
    if (!registerBank) return

    if (this.parameters[1].type === 'NUMBER') {
      console.log(`MOVING ${this.parameters[1].value} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = this.parameters[1].value
    } else {
      console.log(`MOVING ${registerBank[this.parameters[1].value]} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = registerBank[this.parameters[1].value]
    }
  }

  executeSUB({ registerBank }: InstructionOperands) {
    if (!registerBank) return

    if (this.parameters[1].type === 'NUMBER' && this.parameters[2].type === 'NUMBER') {
      console.log(`MOVING ${this.parameters[1].value - this.parameters[2].value} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = this.parameters[1].value - this.parameters[2].value
    } else if (this.parameters[1].type === 'REGISTER' && this.parameters[2].type === 'NUMBER') {
      console.log(`MOVING ${registerBank[this.parameters[1].value] - this.parameters[2].value} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = registerBank[this.parameters[1].value] - this.parameters[2].value
    } else if (this.parameters[1].type === 'REGISTER' && this.parameters[2].type === 'REGISTER') {
      console.log(`MOVING ${registerBank[this.parameters[1].value] - registerBank[this.parameters[2].value]} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = registerBank[this.parameters[1].value] - registerBank[this.parameters[2].value]
    }
  }

  executeADD({ registerBank }: InstructionOperands) {
    if (!registerBank) return

    if (this.parameters[1].type === 'NUMBER' && this.parameters[2].type === 'NUMBER') {
      console.log(`MOVING ${this.parameters[1].value + this.parameters[2].value} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = this.parameters[1].value + this.parameters[2].value
    } else if (this.parameters[1].type === 'REGISTER' && this.parameters[2].type === 'NUMBER') {
      console.log(`MOVING ${registerBank[this.parameters[1].value] + this.parameters[2].value} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = registerBank[this.parameters[1].value] + this.parameters[2].value
    } else if (this.parameters[1].type === 'REGISTER' && this.parameters[2].type === 'REGISTER') {
      console.log(`MOVING ${registerBank[this.parameters[1].value] + registerBank[this.parameters[2].value]} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = registerBank[this.parameters[1].value] + registerBank[this.parameters[2].value]
    }
  }

  executeMUL({ registerBank }: InstructionOperands) {
    if (!registerBank) return

    if (this.parameters[1].type === 'NUMBER' && this.parameters[2].type === 'NUMBER') {
      console.log(`MOVING ${this.parameters[1].value * this.parameters[2].value} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = this.parameters[1].value * this.parameters[2].value
    } else if (this.parameters[1].type === 'REGISTER' && this.parameters[2].type === 'NUMBER') {
      console.log(`MOVING ${registerBank[this.parameters[1].value] * this.parameters[2].value} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = registerBank[this.parameters[1].value] * this.parameters[2].value
    } else if (this.parameters[1].type === 'REGISTER' && this.parameters[2].type === 'REGISTER') {
      console.log(`MOVING ${registerBank[this.parameters[1].value] * registerBank[this.parameters[2].value]} to ${this.parameters[0].value}`)
      registerBank[this.parameters[0].value] = registerBank[this.parameters[1].value] * registerBank[this.parameters[2].value]
    }
  }

  executeB({ registerBank, labels }: InstructionOperands) {
    if (this.parameters[0].type !== 'LABEL') return
    if (!registerBank) return
    if (!labels) return

    const labelName = this.parameters[0].value

    registerBank.pc = labels[labelName]
  }

  executeBL({ registerBank, labels }: InstructionOperands) {
    if (this.parameters[0].type !== 'LABEL') return
    if (!registerBank) return
    if (!labels) return

    const labelName = this.parameters[0].value
    const actualPC = registerBank.pc

    registerBank.pc = labels[labelName]
    registerBank.lr = actualPC + 1
  }

  executeCMP({ registerBank, flags }: InstructionOperands) {
    if (!registerBank) return
    if (!flags) return

    if (this.parameters[0].type === 'NUMBER' && this.parameters[1].type === 'NUMBER') {
      console.log(`COMPARING ${this.parameters[0].value} and ${this.parameters[1].value}`)

      const firstValue = this.parameters[0].value
      const secondValue = this.parameters[1].value

      if (firstValue === secondValue) {
        flags.EQ = true
        flags.NE = false
        flags.GE = true
        flags.LE = true
      } else {
        flags.EQ = false
        flags.NE = true
      }

      if (firstValue > secondValue) {
        flags.GT = true
        flags.GE = true
        flags.LT = false
        flags.LE = false
      }

      if (firstValue < secondValue) {
        flags.GT = false
        flags.GE = false
        flags.LT = true
        flags.LE = true
      }
    } else if (this.parameters[0].type === 'REGISTER' && this.parameters[1].type === 'NUMBER') {
      console.log(`COMPARING ${registerBank[this.parameters[0].value]} and ${this.parameters[1].value}`)

      const firstValue = registerBank[this.parameters[0].value]
      const secondValue = this.parameters[1].value

      if (firstValue === secondValue) {
        flags.EQ = true
        flags.NE = false
        flags.GE = true
        flags.LE = true
      } else {
        flags.EQ = false
        flags.NE = true
      }

      if (firstValue > secondValue) {
        flags.GT = true
        flags.GE = true
        flags.LT = false
        flags.LE = false
      }

      if (firstValue < secondValue) {
        flags.GT = false
        flags.GE = false
        flags.LT = true
        flags.LE = true
      }
    } else if (this.parameters[0].type === 'REGISTER' && this.parameters[1].type === 'REGISTER') {
      console.log(`COMPARING ${this.parameters[0].value} (${registerBank[this.parameters[0].value]}) and ${this.parameters[1].value} (${registerBank[this.parameters[1].value]})`)

      const firstValue = registerBank[this.parameters[0].value]
      const secondValue = registerBank[this.parameters[1].value]

      if (firstValue === secondValue) {
        flags.EQ = true
        flags.NE = false
        flags.GE = true
        flags.LE = true
      } else {
        flags.EQ = false
        flags.NE = true
      }

      if (firstValue > secondValue) {
        flags.GT = true
        flags.GE = true
        flags.LT = false
        flags.LE = false
      }

      if (firstValue < secondValue) {
        flags.GT = false
        flags.GE = false
        flags.LT = true
        flags.LE = true
      }
    }
  }

  executeSWI({ setIsInterrupted }: InstructionOperands) {
    if (setIsInterrupted) {
      setIsInterrupted()
    }
  }

  executeLDR({ registerBank, memory }: InstructionOperands) {
    if (!registerBank) return
    if (!memory) return

    if (this.parameters[0].type === 'REGISTER' && this.parameters[1].type === 'NUMBER') {
      console.log(`MOVING ${this.parameters[0].value} to ${this.parameters[1].value}`)
      registerBank[this.parameters[0].value] = this.parameters[1].value
    } else if (this.parameters[0].type === 'REGISTER' && this.parameters[1].type === 'MEMORY ADDRESS') {
      const baseRegister = this.parameters[1].value[0]
      const offsetRegister = this.parameters[1].value[1]

      const address = registerBank[baseRegister] + registerBank[offsetRegister]

      console.log(`MOVING ${memory[address]} (memory[${address}]) to ${this.parameters[0].value}`)
      this.parameters[0].value = memory[address]
    }
  }

  executeSTR({ registerBank, memory }: InstructionOperands) {
    if (!registerBank) return
    if (!memory) return

    if (this.parameters[0].type === 'REGISTER' && this.parameters[1].type === 'MEMORY ADDRESS') {
      const baseRegister = this.parameters[1].value[0]
      const offsetRegister = this.parameters[1].value[1] || 0

      const address = registerBank[baseRegister] + (registerBank[offsetRegister] || 0)

      console.log('address', address)

      console.log(`Setting (memory[${address}]) to value ${registerBank[this.parameters[0].value]}`)
      memory[address] = registerBank[this.parameters[0].value]
    }
  }

  executeADR({ registerBank, internalVariables }: InstructionOperands) {
    if (!internalVariables) return
    if (!registerBank) return

    const destinyRegister = this.parameters[0].value
    const labelName = this.parameters[1].value

    const memoryAddress = internalVariables[labelName].index

    registerBank[destinyRegister] = memoryAddress
  }

  executeSTMFD({ registerBank, memory }: InstructionOperands) {
    if (!registerBank) return
    if (!memory) return

    const baseRegister = this.parameters[0].value
    const baseAddress = registerBank[baseRegister]

    this.parameters[1].value.forEach((destinyRegister: string, index: number) => {
      memory[baseAddress - index] = registerBank[destinyRegister]
    }) 
  }

  executeSTMIA({ registerBank, memory }: InstructionOperands) {
    if (!registerBank) return
    if (!memory) return

    const baseRegister = this.parameters[0].value
    const baseAddress = registerBank[baseRegister]

    this.parameters[1].value.forEach((destinyRegister: string, index: number) => {
      memory[baseAddress + index] = registerBank[destinyRegister]
    }) 
  }

  executeLDMFD({ registerBank, memory }: InstructionOperands) {
    if (!registerBank) return
    if (!memory) return

    const baseRegister = this.parameters[0].value
    const baseAddress = registerBank[baseRegister]

    this.parameters[1].value.forEach((destinyRegister: string, index: number) => {
      registerBank[destinyRegister] = memory[baseAddress - index]
    })
  }

  executeLDMIA({ registerBank, memory }: InstructionOperands) {
    if (!registerBank) return
    if (!memory) return

    const baseRegister = this.parameters[0].value
    const baseAddress = registerBank[baseRegister]

    this.parameters[1].value.forEach((destinyRegister: string, index: number) => {
      registerBank[destinyRegister] = memory[baseAddress + index]
    })
  }
}

export { Instruction }
