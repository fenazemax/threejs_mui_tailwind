import { Button } from '@ui/button'
import { useModeContext } from '@/context/ModeContext/context'
import type { TViewModes } from '@/types/navigation'
import { ViewModes } from '@/types/navigation'
import React, { useState } from 'react'

export const ModeSelector: React.FC = () => {
  const { mode, onToggleMode } = useModeContext()

  const [isOpen, setIsOpen] = useState(false)

  const modesArray = Object.values(ViewModes)

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleChangeMode = (value: TViewModes) => {
    onToggleMode(value)
  }

  return (
    <div onClick={handleToggleOpen} className="relative cursor-pointer select-none">
      {mode}

      {isOpen && (
        <div className="flex flex-col absolute bg-gray-50 dark:bg-gray-900 border border-gray-400 top-7 -left-5 w-35 rounded-lg">
          {modesArray.map((mode) => (
            <Button key={mode} onClick={() => handleChangeMode(mode)} tailwindClasses="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              {mode}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
