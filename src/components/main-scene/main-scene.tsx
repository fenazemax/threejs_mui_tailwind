import { useModeContext } from '@/context/ModeContext/context'
import React from 'react'
import { ViewScene, RoomConfigurator } from '@components/main-scene/components'
import type { FurnitureItem } from '@/types/data'

interface MainSceneProps {
  selectedItem: FurnitureItem | null
}

export const MainScene: React.FC<MainSceneProps> = (props) => {
  const { selectedItem } = props

  const { mode } = useModeContext()

  switch (mode) {
    case 'View Mode':
      return <ViewScene selectedItem={selectedItem} />
    case 'Config Mode':
      return <RoomConfigurator />
  }

  return null
}
