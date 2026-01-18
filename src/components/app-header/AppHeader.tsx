import React from 'react'
import { ModeSelector, NavigationBar, ThemeToggleSwitch } from '@components/app-header/header-components'
import { Button } from '@ui/button'

export const AppHeader: React.FC = () => {
  return (
    <header className="w-svw py-2.5 flex justify-between items-center px-8 h-20 border-b border-gray-600 bg-gray-100 dark:bg-gray-900">
      <Button
        onClick={() => {
          console.log('Test')
        }}
      >
        Тестовое three.js & react
      </Button>
      <div className="flex gap-20 items-center">
        <NavigationBar />
        <ModeSelector />
        <ThemeToggleSwitch />
      </div>
    </header>
  )
}
