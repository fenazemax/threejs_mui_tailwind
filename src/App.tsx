import React from 'react'
import { Button } from '@components/ui/button'
import { useThemeMode } from '@context/context'

export const App: React.FC = () => {
  const { toggleTheme } = useThemeMode()

  const handleClick = () => {
    toggleTheme()
  }

  return (
    <div className="bg-red-50 w-full h-svh flex items-center justify-center dark:bg-blue-950">
      <Button onClick={handleClick}>Change theme</Button>
    </div>
  )
}
