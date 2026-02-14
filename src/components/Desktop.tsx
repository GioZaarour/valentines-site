import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DesktopIcon } from './DesktopIcon'
import { AppWindow } from './Window'
import { TitleBar } from './TitleBar'
import { Home } from '../pages/Home'
import { PhotoGallery } from '../pages/PhotoGallery'
import { TodoList } from '../pages/TodoList'
import { Letters } from '../pages/Letters'

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/background-image.png') center/cover no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(245, 237, 224, 0.45);
    backdrop-filter: blur(4px);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
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
  { label: 'Valentine', icon: 'heart', page: 'home' },
  { label: 'Photo Gallery', icon: 'photos', page: 'photos' },
  { label: 'Bucket List', icon: 'todo', page: 'todos' },
  { label: 'Letters', icon: 'letters', page: 'letters' },
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
      <TitleBar />
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
