import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import { theme } from './theme'
import App from './App'

// Mock firebase
vi.mock('./firebase', () => ({
  db: {},
}))

// Mock the pages to keep tests focused
vi.mock('./pages/Home', () => ({
  Home: () => <div>Home Page</div>,
}))
vi.mock('./pages/PhotoGallery', () => ({
  PhotoGallery: () => <div>Photo Gallery</div>,
}))
vi.mock('./pages/TodoList', () => ({
  TodoList: () => <div>Todo List</div>,
}))
vi.mock('./pages/Letters', () => ({
  Letters: () => <div>Letters Page</div>,
}))

function renderApp() {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  )
}

describe('App', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('shows password dialog when not authenticated', () => {
    renderApp()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('shows desktop after successful authentication', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText(/password/i), 'valentines')
    await user.click(screen.getByRole('button', { name: /ok/i }))

    expect(screen.getByText('Our Valentine')).toBeInTheDocument()
  })

  it('stores authentication in sessionStorage', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText(/password/i), 'valentines')
    await user.click(screen.getByRole('button', { name: /ok/i }))

    expect(sessionStorage.getItem('authenticated')).toBe('true')
  })

  it('skips password dialog if already authenticated', () => {
    sessionStorage.setItem('authenticated', 'true')
    renderApp()

    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument()
    expect(screen.getByText('Our Valentine')).toBeInTheDocument()
  })
})
