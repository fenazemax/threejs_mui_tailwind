import React, { useMemo, useState } from 'react'
import { ThemeContext, type ThemeMode } from './context'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

interface ThemeContextProviderProps {
  children: React.ReactNode
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
      return savedTheme
    }
    document.documentElement.classList.remove('dark')
    return 'light'
  })

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newMode)
      document.documentElement.classList.toggle('dark', newMode === 'dark')
      return newMode
    })
  }

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
