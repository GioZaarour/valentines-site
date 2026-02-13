import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { Home } from './Home'

describe('Home', () => {
  it('renders the Valentine\'s Day message', () => {
    render(<Home />)
    expect(screen.getByText(/happy valentine/i)).toBeInTheDocument()
  })

  it('renders poem or letter content', () => {
    render(<Home />)
    // The home page should have some text content (a poem/letter)
    const content = screen.getByTestId('home-content')
    expect(content.textContent!.length).toBeGreaterThan(0)
  })
})
