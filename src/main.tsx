import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { styleReset } from 'react95'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './theme'
import App from './App'

const GlobalStyle = createGlobalStyle`
  ${styleReset}

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'ms_sans_serif', sans-serif;
    background: ${() => theme.desktopBackground};
  }
`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
