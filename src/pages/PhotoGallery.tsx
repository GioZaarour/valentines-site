import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fetchPhotos, type Photo } from '../cloudinary'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
  padding: 8px;
`

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #e8d8c8;

  &:hover {
    border-color: #b5446e;
  }
`

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  cursor: pointer;
`

const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`

const Message = styled.p`
  text-align: center;
  padding: 32px;
  color: #4a3030;
  font-size: 14px;
`

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Photo | null>(null)

  useEffect(() => {
    fetchPhotos().then((data) => {
      setPhotos(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Message>Loading photos...</Message>
  if (photos.length === 0) return <Message>No photos yet. Upload some to Cloudinary!</Message>

  return (
    <>
      <Grid>
        {photos.map((photo) => (
          <Thumbnail
            key={photo.id}
            src={photo.thumbnail}
            alt="Photo"
            onClick={() => setSelected(photo)}
          />
        ))}
      </Grid>
      {selected && (
        <Lightbox onClick={() => setSelected(null)}>
          <LightboxImage src={selected.url} alt="Full size photo" />
        </Lightbox>
      )}
    </>
  )
}
