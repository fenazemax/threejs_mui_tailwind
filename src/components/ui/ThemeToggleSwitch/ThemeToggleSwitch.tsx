import { useThemeMode } from '@/context/context'
import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'

export const ThemeToggleSwitch: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode()

  return (
    <FormControlLabel
      control={<Switch checked={mode === 'dark'} onChange={toggleTheme} color="primary" />}
      label={mode === 'dark' ? 'Темная тема' : 'Светлая тема'}
    />
  )
}
