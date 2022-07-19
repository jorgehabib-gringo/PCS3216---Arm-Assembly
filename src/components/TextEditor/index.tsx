import React from 'react'
import { TextEditorArea, Container, LineCounterContainer, Line } from './styles'

interface TextEditorProps {
  setCode(t: string): void
  numberOfLines: number
  code: string
}

export const TextEditor = ({ code, setCode, numberOfLines }: TextEditorProps) => {
  return (
    <Container>
      <LineCounterContainer>
        {numberOfLines > 0 ? new Array(numberOfLines).fill(0).map((_, index) => (
          <Line key={index}>
            {index + 1}
          </Line>
        )) : null}
      </LineCounterContainer>
      <TextEditorArea
        onChange={(e) => setCode(e.target.value)}
        style={{ resize: 'none' }}
        value={code}
        spellCheck={false}
      />
    </Container>
  )
}