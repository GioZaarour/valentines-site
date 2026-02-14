import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../test/test-utils'
import { DesktopIcon } from './DesktopIcon'

describe('DesktopIcon', () => {
  it('renders icon with label', () => {
    render(<DesktopIcon label="Our Valentine" icon="heart" onClick={vi.fn()} />)
    expect(screen.getByText('Our Valentine')).toBeInTheDocument()
  })

  it('calls onClick when double-clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<DesktopIcon label="Our Valentine" icon="heart" onClick={onClick} />)

    await user.dblClick(screen.getByText('Our Valentine'))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders different icon types', () => {
    const { rerender } = render(
      <DesktopIcon label="Photos" icon="photos" onClick={vi.fn()} />
    )
    expect(screen.getByText('Photos')).toBeInTheDocument()

    rerender(
      <DesktopIcon label="Bucket List" icon="todo" onClick={vi.fn()} />
    )
    expect(screen.getByText('Bucket List')).toBeInTheDocument()
  })
})
