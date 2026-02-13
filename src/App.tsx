import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from 'react95'
import styled from 'styled-components'
import { PasswordDialog } from './components/PasswordDialog'
import { Desktop } from './components/Desktop'
import { Home } from './pages/Home'
import { PhotoGallery } from './pages/PhotoGallery'
import { TodoList } from './pages/TodoList'
import { Letters } from './pages/Letters'

const MobilePage = styled.div`
  min-height: 100vh;
  background: #f5ede0;
  padding: 16px;
`

const BackButton = styled(Button)`
  margin-bottom: 16px;
`

function MobileWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <MobilePage>
      <BackButton onClick={() => navigate('/')}>← Back</BackButton>
      {children}
    </MobilePage>
  )
}

function App() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('authenticated') === 'true'
  )

  const handleAuthSuccess = () => {
    sessionStorage.setItem('authenticated', 'true')
    setAuthenticated(true)
  }

  if (!authenticated) {
    return <PasswordDialog onSuccess={handleAuthSuccess} />
  }

  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/home" element={<MobileWrapper><Home /></MobileWrapper>} />
      <Route path="/photos" element={<MobileWrapper><PhotoGallery /></MobileWrapper>} />
      <Route path="/todos" element={<MobileWrapper><TodoList /></MobileWrapper>} />
      <Route path="/letters" element={<MobileWrapper><Letters /></MobileWrapper>} />
    </Routes>
  )
}

export default App
