import { useState, type FormEvent } from 'react'
import { TextInput, Button, Checkbox } from 'react95'
import styled from 'styled-components'
import { useTodos } from '../hooks/useTodos'

const Container = styled.div`
  padding: 8px;
`

const AddForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  border-bottom: 1px solid #e8d8c8;
  text-decoration: ${p => p.$completed ? 'line-through' : 'none'};
  opacity: ${p => p.$completed ? 0.6 : 1};
`

const ItemText = styled.span`
  flex: 1;
  font-size: 14px;
`

const DeleteButton = styled(Button)`
  min-width: 28px;
  padding: 2px 6px;
`

const LoadingText = styled.p`
  text-align: center;
  padding: 16px;
  color: #4a3030;
`

export function TodoList() {
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos()
  const [newText, setNewText] = useState('')

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = newText.trim()
    if (!trimmed) return
    await addTodo(trimmed)
    setNewText('')
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this item?')) {
      deleteTodo(id)
    }
  }

  if (loading) return <LoadingText>Loading...</LoadingText>

  return (
    <Container>
      <AddForm onSubmit={handleAdd}>
        <TextInput
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Add a new bucket list item..."
          style={{ flex: 1 }}
        />
        <Button type="submit" aria-label="Add">Add</Button>
      </AddForm>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} $completed={todo.completed}>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
              label=""
            />
            <ItemText>{todo.text}</ItemText>
            <DeleteButton onClick={() => handleDelete(todo.id)} aria-label="Delete" size="sm">
              ✕
            </DeleteButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
