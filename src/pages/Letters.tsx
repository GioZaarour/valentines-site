import { useState, type FormEvent } from 'react'
import { Button, Select, TextInput } from 'react95'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { useLetters } from '../hooks/useLetters'

const Container = styled.div`
  padding: 8px;
`

const ComposeArea = styled.div`
  margin-bottom: 16px;
`

const ComposeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const LetterCard = styled.div`
  border: 1px solid #e8d8c8;
  padding: 12px;
  margin-bottom: 12px;
  background: #fff8f0;
`

const LetterMeta = styled.div`
  font-size: 12px;
  color: #9e6e6e;
  margin-bottom: 8px;
`

const LetterContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #4a3030;

  p { margin: 0 0 8px; }
  strong { font-weight: bold; }
  em { font-style: italic; }
`

const LoadingText = styled.p`
  text-align: center;
  padding: 16px;
  color: #4a3030;
`

const authorOptions = [
  { value: 'Jous', label: 'Jous' },
  { value: 'Geem', label: 'Geem' },
]

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function Letters() {
  const { letters, loading, addLetter } = useLetters()
  const [composing, setComposing] = useState(false)
  const [author, setAuthor] = useState('Jous')
  const [content, setContent] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = content.trim()
    if (!trimmed) return
    await addLetter(author, trimmed)
    setContent('')
    setComposing(false)
  }

  if (loading) return <LoadingText>Loading...</LoadingText>

  return (
    <Container>
      <ComposeArea>
        {!composing ? (
          <Button onClick={() => setComposing(true)} aria-label="Write a letter">
            Write a Letter
          </Button>
        ) : (
          <ComposeForm onSubmit={handleSubmit}>
            <label htmlFor="author-select">From</label>
            <Select
              id="author-select"
              aria-label="From"
              options={authorOptions}
              value={author}
              onChange={(e) => setAuthor(e.value as string)}
              width={160}
            />
            <TextInput
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your letter... (supports **bold** and *italic*)"
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <Button type="submit" aria-label="Send">Send</Button>
              <Button type="button" onClick={() => setComposing(false)}>Cancel</Button>
            </div>
          </ComposeForm>
        )}
      </ComposeArea>

      {letters.map((letter) => (
        <LetterCard key={letter.id}>
          <LetterMeta>
            From {letter.author} &middot; {formatDate(letter.createdAt.toDate())}
          </LetterMeta>
          <LetterContent>
            <ReactMarkdown>{letter.content}</ReactMarkdown>
          </LetterContent>
        </LetterCard>
      ))}
    </Container>
  )
}
