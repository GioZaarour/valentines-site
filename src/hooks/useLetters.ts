import { useState, useEffect } from 'react'
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export interface Letter {
  id: string
  author: 'Jous' | 'Geem'
  content: string
  createdAt: { toDate: () => Date }
}

export function useLetters() {
  const [letters, setLetters] = useState<Letter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'letters'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Letter[]
      setLetters(items)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const addLetter = async (author: string, content: string) => {
    await addDoc(collection(db, 'letters'), {
      author,
      content,
      createdAt: serverTimestamp(),
    })
  }

  return { letters, loading, addLetter }
}
