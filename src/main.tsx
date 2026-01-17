import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import '@styles/main.css'
import { ModeContextProvider, ThemeContextProvider } from '@/context'

createRoot(document.getElementById('root')!).render(
  <ThemeContextProvider>
    <ModeContextProvider>
      <App />
    </ModeContextProvider>
  </ThemeContextProvider>,
)
