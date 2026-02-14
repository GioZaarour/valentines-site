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

const poem = `To see you chase your dreams inspires me
I hope you get to see all that you try to reach
You shouldn\’t shed a tear when my eyes could be
Taking the place of yours when your mind is bleak
I just want the best for you besides of me
You warm me in DC despite the freeze
My heart beats for you, you\’re tied to me
God blessed us both when he led to you finding me
Endless gratitude is not enough,
Your love is endless like the universe that guided me
To meet you in its unbounded improbability
I wish you knew how knowing you feels to me
But then again you do because I know your love for me`

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
