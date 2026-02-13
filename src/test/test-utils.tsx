import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { styleReset } from 'react95'
import { MemoryRouter } from 'react-router-dom'
import { theme } from '../theme'

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <style>{styleReset}</style>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </ThemeProvider>
  )
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
