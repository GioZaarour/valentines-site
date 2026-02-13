import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../test/test-utils'
import { Letters } from './Letters'

const mockAddLetter = vi.fn()

vi.mock('../hooks/useLetters', () => ({
  useLetters: () => ({
    letters: [
      {
        id: '1',
        author: 'Jous',
        content: 'You are my **sunshine**',
        createdAt: { toDate: () => new Date('2026-02-14') },
      },
      {
        id: '2',
        author: 'Geem',
        content: 'I love you *so much*',
        createdAt: { toDate: () => new Date('2026-02-13') },
      },
    ],
    loading: false,
    addLetter: mockAddLetter,
  }),
}))

describe('Letters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders existing letters', () => {
    render(<Letters />)
    expect(screen.getByText(/sunshine/)).toBeInTheDocument()
    expect(screen.getByText(/love you/)).toBeInTheDocument()
  })

  it('shows author names on letters', () => {
    render(<Letters />)
    expect(screen.getByText(/Jous/)).toBeInTheDocument()
    expect(screen.getByText(/Geem/)).toBeInTheDocument()
  })

  it('shows dates on letters', () => {
    render(<Letters />)
    expect(screen.getByText(/February 14, 2026/)).toBeInTheDocument()
  })

  it('has a compose button or form', () => {
    render(<Letters />)
    expect(screen.getByRole('button', { name: /write|compose|new/i })).toBeInTheDocument()
  })

  it('shows compose form when compose button is clicked', async () => {
    const user = userEvent.setup()
    render(<Letters />)

    await user.click(screen.getByRole('button', { name: /write|compose|new/i }))

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('submits a new letter', async () => {
    const user = userEvent.setup()
    render(<Letters />)

    await user.click(screen.getByRole('button', { name: /write|compose|new/i }))
    await user.type(screen.getByRole('textbox'), 'My dearest love')
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(mockAddLetter).toHaveBeenCalledWith(
      expect.any(String),
      'My dearest love'
    )
  })

  it('has author selection dropdown with Jous and Geem', async () => {
    const user = userEvent.setup()
    render(<Letters />)

    await user.click(screen.getByRole('button', { name: /write|compose|new/i }))

    // Should have a select/dropdown for author
    const authorSelect = screen.getByLabelText(/from/i)
    expect(authorSelect).toBeInTheDocument()
  })
})
