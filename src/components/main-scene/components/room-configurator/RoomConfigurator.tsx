import React, { useRef, useState } from 'react'
import type { FurnitureItem } from '@/types/data'
import { catalogData } from '@/constants'
import { ConfigSettings, ConfiguratorCanvas, FurnitureSelector } from '@/components/threejs-components'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { IPlacedFurniture, IRoomConfig } from '@/types/config'

export const RoomConfigurator: React.FC = () => {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null)

  const [config, setConfig] = useState<IRoomConfig>({
    floorColor: '#d4a574',
    wallColor: '#e8e8e8',
    lighting: 1,
  })

  const [id, setId] = useState(1)

  const [placedFurniture, setPlacedFurniture] = useState<IPlacedFurniture[]>([])

  const handleUpdateFurniturePosition = (id: string, newPosition: [number, number, number]) => {
    setPlacedFurniture((prev) => prev.map((item) => (item.id === id ? { ...item, position: newPosition } : item)))
  }

  const handleAddFurniture = (item: FurnitureItem) => {
    const newItem: IPlacedFurniture = {
      id: `${item.id}-${setId((prev) => prev + 1)}-${id}`,
      item,
      position: [0, 0, 0],
      rotation: 0,
    }
    setPlacedFurniture([...placedFurniture, newItem])
  }

  const handleRemoveFurniture = (id: string) => {
    setPlacedFurniture(placedFurniture.filter((fur) => fur.id !== id))
  }

  const handleChangeConfig = (value: React.SetStateAction<IRoomConfig>) => {
    setConfig(value)
  }

  return (
    <div className="flex flex-row-reverse w-full px-10 justify-center gap-10">
      <FurnitureSelector config={config} onChangeConfig={handleChangeConfig} />

      <ConfiguratorCanvas
        config={config}
        orbitControlsRef={orbitControlsRef}
        placedFurniture={placedFurniture}
        onUpdateFurniturePosition={handleUpdateFurniturePosition}
      />

      <ConfigSettings
        catalogData={catalogData}
        placedFurniture={placedFurniture}
        onAddFurniture={handleAddFurniture}
        onRemoveFurniture={handleRemoveFurniture}
      />
    </div>
  )
}
