import type { TViewModes } from '@/types/navigation'
import { ViewModes } from '@/types/navigation'
import React, { useState } from 'react'
import { ModeContext } from './context'

interface ModeContextProviderProps {
  children: React.ReactNode
}

export const ModeContextProvider: React.FC<ModeContextProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<TViewModes>(ViewModes.VIEW_MODE)

  const onToggleMode = (mode: TViewModes) => {
    setMode(mode)
  }
  return <ModeContext.Provider value={{ mode, onToggleMode }}>{children}</ModeContext.Provider>
}
