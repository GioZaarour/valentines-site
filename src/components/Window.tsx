import type { ReactNode } from 'react'
import { Window, WindowHeader, WindowContent, Button } from 'react95'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const StyledWindow = styled(Window)`
  width: 90%;
  max-width: 640px;
  max-height: 80vh;
`

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CloseButton = styled(Button)`
  margin-right: -2px;
  margin-top: 1px;
`

const ScrollContent = styled(WindowContent)`
  overflow-y: auto;
  max-height: calc(80vh - 40px);
`

interface AppWindowProps {
  title: string
  onClose: () => void
  children: ReactNode
}

export function AppWindow({ title, onClose, children }: AppWindowProps) {
  return (
    <Overlay>
      <StyledWindow>
        <Header>
          <span>{title}</span>
          <CloseButton size="sm" onClick={onClose} aria-label="Close">
            ×
          </CloseButton>
        </Header>
        <ScrollContent>
          {children}
        </ScrollContent>
      </StyledWindow>
    </Overlay>
  )
}
