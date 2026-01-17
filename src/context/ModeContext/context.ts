import type { TViewModes } from '@/types/navigation'
import { createContext, useContext } from 'react'

interface ModeContextType {
  mode: TViewModes
  onToggleMode: (mode: TViewModes) => void
}

export const ModeContext = createContext<ModeContextType | undefined>(undefined)

export const useModeContext = () => {
  const context = useContext(ModeContext)
  if (!context) throw new Error('useThemeMode must be used within ModeContextProvider')
  return context
}
