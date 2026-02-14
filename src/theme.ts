import original from 'react95/dist/themes/original'

// Warm Valentine's variant of the Win95 theme
// Override the default grays with slightly warm cream/rose tones
export const theme = {
  ...original,
  desktopBackground: '#5f3460',
  material: '#f5ede0',
  materialDark: '#e8d8c8',
  borderDarkest: '#5a3e3e',
  borderLightest: '#fff8f0',
  headerBackground: 'linear-gradient(90deg, #b5446e, #d4738a)',
  headerNotActiveBackground: 'linear-gradient(90deg, #9e8e8e, #b8a8a8)',
  headerText: '#fff8f0',
  headerNotActiveText: '#e8d8d8',
}
