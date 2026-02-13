export interface Photo {
  id: string
  url: string
  thumbnail: string
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'
const FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER || 'valentines'

export async function fetchPhotos(): Promise<Photo[]> {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${FOLDER}.json`
    )
    if (!response.ok) return []
    const data = await response.json()
    return (data.resources || []).map((r: { public_id: string; format: string }) => {
      const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`
      return {
        id: r.public_id,
        url: `${base}/${r.public_id}.${r.format}`,
        thumbnail: `${base}/c_fill,w_300,h_300/${r.public_id}.${r.format}`,
      }
    })
  } catch {
    return []
  }
}
