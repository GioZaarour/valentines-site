import { useState, type FormEvent } from 'react'
import { Window, WindowHeader, WindowContent, TextInput, Button } from 'react95'
import styled from 'styled-components'

const PASSWORD = 'valentines'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const StyledWindow = styled(Window)`
  width: 360px;
`

const Message = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Label = styled.label`
  font-size: 14px;
`

const ErrorText = styled.p`
  color: #c00;
  font-size: 13px;
  margin: 0;
`

interface PasswordDialogProps {
  onSuccess: () => void
}

export function PasswordDialog({ onSuccess }: PasswordDialogProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value === PASSWORD) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <Overlay>
      <StyledWindow>
        <WindowHeader>
          <span>Welcome</span>
        </WindowHeader>
        <WindowContent>
          <Message>Please enter the password to continue.</Message>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="password-input">Password</Label>
            <TextInput
              id="password-input"
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setError(false)
              }}
              aria-label="Password"
            />
            {error && <ErrorText>Incorrect password. Try again.</ErrorText>}
            <Button type="submit">OK</Button>
          </Form>
        </WindowContent>
      </StyledWindow>
    </Overlay>
  )
}
