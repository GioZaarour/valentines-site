import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DesktopIcon } from './DesktopIcon'
import { AppWindow } from './Window'
import { Home } from '../pages/Home'
import { PhotoGallery } from '../pages/PhotoGallery'
import { TodoList } from '../pages/TodoList'
import { Letters } from '../pages/Letters'

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #d4738a 0%, #f5c6d0 50%, #fef0e0 100%);
  position: relative;
  overflow: hidden;
`

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 96px);
  gap: 16px;
  padding: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 16px;
    justify-items: center;
  }
`

type PageKey = 'home' | 'photos' | 'todos' | 'letters'

const icons: { label: string; icon: string; page: PageKey }[] = [
  { label: 'Our Valentine', icon: 'heart', page: 'home' },
  { label: 'Our Photos', icon: 'photos', page: 'photos' },
  { label: 'Our Bucket List', icon: 'todo', page: 'todos' },
  { label: 'Love Letters', icon: 'letters', page: 'letters' },
]

const windowTitles: Record<PageKey, string> = {
  home: 'Our Valentine',
  photos: 'Our Photos',
  todos: 'Our Bucket List',
  letters: 'Love Letters',
}

const isMobile = () => window.innerWidth <= 768

export function Desktop() {
  const [activePage, setActivePage] = useState<PageKey | null>(null)
  const navigate = useNavigate()

  const handleIconClick = (page: PageKey) => {
    if (isMobile()) {
      navigate(`/${page}`)
    } else {
      setActivePage(page)
    }
  }

  const renderPageContent = () => {
    switch (activePage) {
      case 'home': return <Home />
      case 'photos': return <PhotoGallery />
      case 'todos': return <TodoList />
      case 'letters': return <Letters />
      default: return null
    }
  }

  return (
    <DesktopContainer>
      <IconGrid>
        {icons.map((item) => (
          <DesktopIcon
            key={item.page}
            label={item.label}
            icon={item.icon}
            onClick={() => handleIconClick(item.page)}
          />
        ))}
      </IconGrid>
      {activePage && (
        <AppWindow
          title={windowTitles[activePage]}
          onClose={() => setActivePage(null)}
        >
          {renderPageContent()}
        </AppWindow>
      )}
    </DesktopContainer>
  )
}
