import React from 'react'
import { ThemeToggleSwitch } from '@components/ui/ThemeToggleSwitch'

export const AppHeader: React.FC = () => {
  return (
    <header className="w-svw p-2.5 flex h-20 border-b border-gray-600 bg-gray-100 dark:bg-gray-900">
      <ThemeToggleSwitch />
    </header>
  )
}
