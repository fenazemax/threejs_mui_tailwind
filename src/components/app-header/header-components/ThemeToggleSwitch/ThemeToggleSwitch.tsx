import { DARK_THEME_LABEL, LIGHT_THEME_LABEL } from '@/constants'
import { useThemeMode } from '@/context/ThemeContext/context'
import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'

export const ThemeToggleSwitch: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode()

  const checked = mode === 'dark'

  const label = checked ? DARK_THEME_LABEL : LIGHT_THEME_LABEL

  return <FormControlLabel control={<Switch checked={checked} onChange={toggleTheme} color="primary" />} label={label} />
}
