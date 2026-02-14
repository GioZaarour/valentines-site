import { vi } from 'vitest'

// Mock Firebase
export const mockOnSnapshot = vi.fn()
export const mockAddDoc = vi.fn()
export const mockUpdateDoc = vi.fn()
export const mockDeleteDoc = vi.fn()
export const mockCollection = vi.fn()
export const mockDoc = vi.fn()
export const mockQuery = vi.fn()
export const mockOrderBy = vi.fn()
export const mockServerTimestamp = vi.fn(() => ({ _type: 'timestamp' }))

vi.mock('../firebase', () => ({
  db: {},
}))

vi.mock('firebase/firestore', () => ({
  collection: (...args: unknown[]) => mockCollection(...args),
  doc: (...args: unknown[]) => mockDoc(...args),
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
  updateDoc: (...args: unknown[]) => mockUpdateDoc(...args),
  deleteDoc: (...args: unknown[]) => mockDeleteDoc(...args),
  onSnapshot: (...args: unknown[]) => mockOnSnapshot(...args),
  query: (...args: unknown[]) => mockQuery(...args),
  orderBy: (...args: unknown[]) => mockOrderBy(...args),
  serverTimestamp: () => mockServerTimestamp(),
}))
