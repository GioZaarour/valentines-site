import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../test/test-utils'
import { TodoList } from './TodoList'

// Mock the useTodos hook
const mockAddTodo = vi.fn()
const mockToggleTodo = vi.fn()
const mockDeleteTodo = vi.fn()

vi.mock('../hooks/useTodos', () => ({
  useTodos: () => ({
    todos: [
      { id: '1', text: 'Visit Paris', completed: false, createdAt: { toDate: () => new Date('2026-01-01') } },
      { id: '2', text: 'Learn to cook', completed: true, createdAt: { toDate: () => new Date('2026-01-02') } },
    ],
    loading: false,
    addTodo: mockAddTodo,
    toggleTodo: mockToggleTodo,
    deleteTodo: mockDeleteTodo,
  }),
}))

describe('TodoList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset window.confirm mock
    vi.spyOn(window, 'confirm').mockReturnValue(true)
  })

  it('renders todo items', () => {
    render(<TodoList />)
    expect(screen.getByText('Visit Paris')).toBeInTheDocument()
    expect(screen.getByText('Learn to cook')).toBeInTheDocument()
  })

  it('renders an input field and add button', () => {
    render(<TodoList />)
    expect(screen.getByPlaceholderText(/add/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('adds a new todo when add button is clicked', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    await user.type(screen.getByPlaceholderText(/add/i), 'Go skydiving')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(mockAddTodo).toHaveBeenCalledWith('Go skydiving')
  })

  it('toggles a todo when checkbox is clicked', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    expect(mockToggleTodo).toHaveBeenCalledWith('1', false)
  })

  it('deletes a todo when delete button is clicked and confirmed', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    await user.click(deleteButtons[0])

    expect(mockDeleteTodo).toHaveBeenCalledWith('1')
  })

  it('does not delete when confirmation is cancelled', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    const user = userEvent.setup()
    render(<TodoList />)

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    await user.click(deleteButtons[0])

    expect(mockDeleteTodo).not.toHaveBeenCalled()
  })

  it('does not add empty todos', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(mockAddTodo).not.toHaveBeenCalled()
  })
})
