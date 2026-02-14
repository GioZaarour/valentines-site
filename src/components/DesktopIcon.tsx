import styled from 'styled-components'

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 8px;
  width: 80px;
  user-select: none;

  &:hover {
    opacity: 0.85;
  }
`

const IconImage = styled.div<{ $type: string }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

const IconLabel = styled.span`
  color: #000;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
  word-wrap: break-word;
  max-width: 72px;
`

const iconMap: Record<string, string> = {
  heart: '💕',
  photos: '📷',
  todo: '📝',
  letters: '💌',
}

interface DesktopIconProps {
  label: string
  icon: string
  onClick: () => void
}

export function DesktopIcon({ label, icon, onClick }: DesktopIconProps) {
  return (
    <IconWrapper onDoubleClick={onClick}>
      <IconImage $type={icon}>{iconMap[icon] || '📁'}</IconImage>
      <IconLabel>{label}</IconLabel>
    </IconWrapper>
  )
}
