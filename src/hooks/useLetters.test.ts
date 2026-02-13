import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

const mockOnSnapshot = vi.fn()
const mockAddDoc = vi.fn()

vi.mock('../firebase', () => ({
  db: {},
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
  onSnapshot: (...args: unknown[]) => mockOnSnapshot(...args),
  query: vi.fn(),
  orderBy: vi.fn(),
  serverTimestamp: vi.fn(() => ({ _type: 'timestamp' })),
}))

import { useLetters } from './useLetters'

describe('useLetters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockOnSnapshot.mockImplementation((_q: unknown, callback: (snap: { docs: unknown[] }) => void) => {
      callback({ docs: [] })
      return vi.fn()
    })
    mockAddDoc.mockResolvedValue({ id: 'new-id' })
  })

  it('returns loading false after data loads', () => {
    const { result } = renderHook(() => useLetters())
    expect(result.current.loading).toBe(false)
    expect(result.current.letters).toEqual([])
  })

  it('returns letters from Firestore snapshot', () => {
    mockOnSnapshot.mockImplementation((_q: unknown, callback: (snap: { docs: { id: string; data: () => Record<string, unknown> }[] }) => void) => {
      callback({
        docs: [
          { id: '1', data: () => ({ author: 'Jous', content: 'Hello', createdAt: { toDate: () => new Date() } }) },
        ],
      })
      return vi.fn()
    })

    const { result } = renderHook(() => useLetters())
    expect(result.current.letters).toHaveLength(1)
    expect(result.current.letters[0].author).toBe('Jous')
  })

  it('addLetter calls addDoc with correct data', async () => {
    const { result } = renderHook(() => useLetters())

    await act(async () => {
      await result.current.addLetter('Geem', 'I love you')
    })

    expect(mockAddDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        author: 'Geem',
        content: 'I love you',
      })
    )
  })

  it('unsubscribes from snapshot on unmount', () => {
    const unsubscribe = vi.fn()
    mockOnSnapshot.mockImplementation((_q: unknown, callback: (snap: { docs: unknown[] }) => void) => {
      callback({ docs: [] })
      return unsubscribe
    })

    const { unmount } = renderHook(() => useLetters())
    unmount()

    expect(unsubscribe).toHaveBeenCalled()
  })
})
