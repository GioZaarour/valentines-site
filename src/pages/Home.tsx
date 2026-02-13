import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  padding: 24px 16px;
`

const Title = styled.h1`
  font-family: 'Georgia', serif;
  color: #b5446e;
  font-size: 24px;
  margin-bottom: 24px;
`

const Content = styled.div`
  font-family: 'Georgia', serif;
  font-size: 16px;
  line-height: 1.8;
  color: #4a3030;
  max-width: 480px;
  margin: 0 auto;
  white-space: pre-line;
`

const poem = `Every moment spent with you
is a moment I treasure.
You are my heart, my soul,
my endless, boundless pleasure.

Through every season, hand in hand,
we write our story true.
Of all the wonders in this world,
my favorite one is you.`

export function Home() {
  return (
    <Container>
      <Title>Happy Valentine's Day</Title>
      <Content data-testid="home-content">
        {poem}
      </Content>
    </Container>
  )
}
