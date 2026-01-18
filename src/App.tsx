import React, { useState } from 'react'
import { AppHeader } from '@components/app-header'
import { AppDrawer } from '@components/app-drawer'
import { AppMain } from '@components/app-main'
import { MainScene } from '@components/main-scene'

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleDrawer = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="bg-gray-50 w-svw h-svh flex flex-col items-center dark:bg-gray-900">
      <AppHeader />
      <AppDrawer isOpen={isOpen} onToggleOpen={handleToggleDrawer} />
      <AppMain onToggleDrawer={handleToggleDrawer}>
        <MainScene />
      </AppMain>
    </div>
  )
}
