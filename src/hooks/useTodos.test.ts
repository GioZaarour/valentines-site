import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

const mockOnSnapshot = vi.fn()
const mockAddDoc = vi.fn()
const mockUpdateDoc = vi.fn()
const mockDeleteDoc = vi.fn()

vi.mock('../firebase', () => ({
  db: {},
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
  updateDoc: (...args: unknown[]) => mockUpdateDoc(...args),
  deleteDoc: (...args: unknown[]) => mockDeleteDoc(...args),
  onSnapshot: (...args: unknown[]) => mockOnSnapshot(...args),
  query: vi.fn(),
  orderBy: vi.fn(),
  serverTimestamp: vi.fn(() => ({ _type: 'timestamp' })),
}))

import { useTodos } from './useTodos'

describe('useTodos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockOnSnapshot.mockImplementation((_q: unknown, callback: (snap: { docs: unknown[] }) => void) => {
      callback({ docs: [] })
      return vi.fn() // unsubscribe
    })
    mockAddDoc.mockResolvedValue({ id: 'new-id' })
    mockUpdateDoc.mockResolvedValue(undefined)
    mockDeleteDoc.mockResolvedValue(undefined)
  })

  it('returns todos as empty array after snapshot fires', () => {
    const { result } = renderHook(() => useTodos())
    expect(result.current.loading).toBe(false)
    expect(result.current.todos).toEqual([])
  })

  it('returns todos from Firestore snapshot', () => {
    mockOnSnapshot.mockImplementation((_q: unknown, callback: (snap: { docs: { id: string; data: () => Record<string, unknown> }[] }) => void) => {
      callback({
        docs: [
          { id: '1', data: () => ({ text: 'Visit Paris', completed: false, createdAt: { toDate: () => new Date() } }) },
          { id: '2', data: () => ({ text: 'Learn to cook', completed: true, createdAt: { toDate: () => new Date() } }) },
        ],
      })
      return vi.fn()
    })

    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toHaveLength(2)
    expect(result.current.todos[0].text).toBe('Visit Paris')
  })

  it('addTodo calls addDoc with correct data', async () => {
    const { result } = renderHook(() => useTodos())

    await act(async () => {
      await result.current.addTodo('Go skydiving')
    })

    expect(mockAddDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        text: 'Go skydiving',
        completed: false,
      })
    )
  })

  it('toggleTodo calls updateDoc', async () => {
    const { result } = renderHook(() => useTodos())

    await act(async () => {
      await result.current.toggleTodo('1', true)
    })

    expect(mockUpdateDoc).toHaveBeenCalledWith(
      undefined,
      { completed: false }
    )
  })

  it('deleteTodo calls deleteDoc', async () => {
    const { result } = renderHook(() => useTodos())

    await act(async () => {
      await result.current.deleteTodo('1')
    })

    expect(mockDeleteDoc).toHaveBeenCalled()
  })

  it('unsubscribes from snapshot on unmount', () => {
    const unsubscribe = vi.fn()
    mockOnSnapshot.mockImplementation((_q: unknown, callback: (snap: { docs: unknown[] }) => void) => {
      callback({ docs: [] })
      return unsubscribe
    })

    const { unmount } = renderHook(() => useTodos())
    unmount()

    expect(unsubscribe).toHaveBeenCalled()
  })
})
