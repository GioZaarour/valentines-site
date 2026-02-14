import styled from 'styled-components'

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: #f5ede0;
  border-bottom: 1px solid #e8d8c8;
  z-index: 10;
  position: relative;
`

const HeartIcon = styled.span`
  font-size: 20px;
  line-height: 1;
`

const Title = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: #1a1a1a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

export function TitleBar() {
  return (
    <Bar>
      <HeartIcon>❤️</HeartIcon>
      <Title>GeemJous OS</Title>
    </Bar>
  )
}
