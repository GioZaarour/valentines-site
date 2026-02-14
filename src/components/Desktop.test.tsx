import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { Desktop } from './Desktop'

describe('Desktop', () => {
  it('renders all four desktop icons', () => {
    render(<Desktop />)
    expect(screen.getByText('Our Valentine')).toBeInTheDocument()
    expect(screen.getByText('Our Photos')).toBeInTheDocument()
    expect(screen.getByText('Our Bucket List')).toBeInTheDocument()
    expect(screen.getByText('Love Letters')).toBeInTheDocument()
  })

  it('renders the desktop background area', () => {
    const { container } = render(<Desktop />)
    // The desktop should have a background container
    expect(container.firstChild).toBeTruthy()
  })
})
