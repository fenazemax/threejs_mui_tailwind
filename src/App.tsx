import React, { useState } from 'react'
import { AppHeader } from '@components/app-header'
import { AppDrawer } from '@components/app-drawer'
import { AppMain } from '@components/app-main'
import { MainScene } from '@components/main-scene'
import type { FurnitureItem } from './types/data'

export const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FurnitureItem | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleDrawer = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSelectItem = (item: FurnitureItem) => {
    setSelectedItem(item)
  }

  return (
    <div className="bg-gray-50 w-svw h-svh flex flex-col items-center dark:bg-gray-900">
      <AppHeader />
      <AppDrawer isOpen={isOpen} onToggleOpen={handleToggleDrawer} onSelectItem={handleSelectItem} />
      <AppMain onToggleDrawer={handleToggleDrawer}>
        <MainScene selectedItem={selectedItem} />
      </AppMain>
    </div>
  )
}
