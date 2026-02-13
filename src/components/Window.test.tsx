import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../test/test-utils'
import { AppWindow } from './Window'

describe('AppWindow', () => {
  it('renders with a title', () => {
    render(
      <AppWindow title="Test Window" onClose={vi.fn()}>
        <p>Content</p>
      </AppWindow>
    )
    expect(screen.getByText('Test Window')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <AppWindow title="Test Window" onClose={vi.fn()}>
        <p>Hello World</p>
      </AppWindow>
    )
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <AppWindow title="Test Window" onClose={onClose}>
        <p>Content</p>
      </AppWindow>
    )

    const closeButtons = screen.getAllByRole('button')
    // The close button is typically the last button in the title bar
    const closeButton = closeButtons.find(btn =>
      btn.getAttribute('aria-label') === 'Close' || btn.textContent === '×'
    ) ?? closeButtons[closeButtons.length - 1]

    await user.click(closeButton!)
    expect(onClose).toHaveBeenCalled()
  })
})
