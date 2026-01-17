import React from 'react'
import { AppHeader } from '@components/app-header'

export const App: React.FC = () => {
  return (
    <div className="bg-gray-50 w-svw h-svh flex justify-center dark:bg-gray-900">
      <AppHeader />
    </div>
  )
}
