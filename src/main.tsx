import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import '@styles/main.css'
import { ThemeContextProvider } from '@context/ThemeContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
)
