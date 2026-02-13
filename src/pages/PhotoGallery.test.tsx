import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'
import { PhotoGallery } from './PhotoGallery'

// Mock the cloudinary module
vi.mock('../cloudinary', () => ({
  fetchPhotos: vi.fn(() =>
    Promise.resolve([
      { id: '1', url: 'https://res.cloudinary.com/demo/image/upload/photo1.jpg', thumbnail: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_300,h_300/photo1.jpg' },
      { id: '2', url: 'https://res.cloudinary.com/demo/image/upload/photo2.jpg', thumbnail: 'https://res.cloudinary.com/demo/image/upload/c_fill,w_300,h_300/photo2.jpg' },
    ])
  ),
}))

describe('PhotoGallery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows a loading state initially', () => {
    render(<PhotoGallery />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders photos after loading', async () => {
    render(<PhotoGallery />)
    await waitFor(() => {
      const images = screen.getAllByRole('img')
      expect(images.length).toBe(2)
    })
  })

  it('shows empty state when no photos', async () => {
    const { fetchPhotos } = await import('../cloudinary')
    vi.mocked(fetchPhotos).mockResolvedValueOnce([])

    render(<PhotoGallery />)
    await waitFor(() => {
      expect(screen.getByText(/no photos/i)).toBeInTheDocument()
    })
  })
})
