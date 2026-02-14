import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: { toDate: () => Date }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Todo[]
      // Sort: unchecked first, then checked. Within each group, newest first (already from query).
      items.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        return 0
      })
      setTodos(items)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const addTodo = async (text: string) => {
    await addDoc(collection(db, 'todos'), {
      text,
      completed: false,
      createdAt: serverTimestamp(),
    })
  }

  const toggleTodo = async (id: string, currentCompleted: boolean) => {
    await updateDoc(doc(db, 'todos', id), { completed: !currentCompleted })
  }

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return { todos, loading, addTodo, toggleTodo, deleteTodo }
}
