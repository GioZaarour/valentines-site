import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../test/test-utils'
import { PasswordDialog } from './PasswordDialog'

describe('PasswordDialog', () => {
  it('renders a password input and OK button', () => {
    render(<PasswordDialog onSuccess={vi.fn()} />)
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument()
  })

  it('renders a title bar with welcome text', () => {
    render(<PasswordDialog onSuccess={vi.fn()} />)
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })

  it('calls onSuccess when the correct password is entered', async () => {
    const onSuccess = vi.fn()
    const user = userEvent.setup()
    render(<PasswordDialog onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/password/i), 'valentines')
    await user.click(screen.getByRole('button', { name: /ok/i }))

    expect(onSuccess).toHaveBeenCalled()
  })

  it('shows an error when incorrect password is entered', async () => {
    const user = userEvent.setup()
    render(<PasswordDialog onSuccess={vi.fn()} />)

    await user.type(screen.getByLabelText(/password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /ok/i }))

    expect(screen.getByText(/incorrect password/i)).toBeInTheDocument()
  })

  it('submits on Enter key press', async () => {
    const onSuccess = vi.fn()
    const user = userEvent.setup()
    render(<PasswordDialog onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/password/i), 'valentines{Enter}')

    expect(onSuccess).toHaveBeenCalled()
  })
})
