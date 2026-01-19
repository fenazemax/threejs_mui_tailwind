import React, { useEffect, useRef, useState } from 'react'
import type { FurnitureItem } from '@/types/data'
import { catalogData, STORAGE_KEY } from '@/constants'
import { ConfigSettings, ConfiguratorCanvas, FurnitureSelector } from '@/components/threejs-components'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { DataForLS, IPlacedFurniture, IRoomConfig } from '@/types/config'
import { saveConfigToLS } from '@/utils/saveToLS'
import { loadConfigFromLS } from '@/utils/loadFromLS'

const defaultConfig: IRoomConfig = {
  floorColor: '#d4a574',
  wallColor: '#e8e8e8',
  lighting: 1,
}

export const RoomConfigurator: React.FC = () => {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null)

  const [config, setConfig] = useState<IRoomConfig>(defaultConfig)
  const [id, setId] = useState(1)
  const [placedFurniture, setPlacedFurniture] = useState<IPlacedFurniture[]>([])
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<string | null>(null)

  const handleUpdateFurniturePosition = (id: string, newPosition: [number, number, number]) => {
    setPlacedFurniture((prev) => prev.map((item) => (item.id === id ? { ...item, position: newPosition } : item)))
  }

  const handleUpdateFurnitureScale = (id: string, newScale: number) => {
    setPlacedFurniture((prev) => prev.map((item) => (item.id === id ? { ...item, scale: newScale } : item)))
  }

  const handleAddFurniture = (item: FurnitureItem) => {
    const newItem: IPlacedFurniture = {
      id: `${item.id}-${setId((prev) => prev + 1)}-${id}`,
      item,
      position: [0, 0, 0],
      rotation: 0,
      scale: item.defaultScale || 1,
    }
    setPlacedFurniture([...placedFurniture, newItem])
  }

  const handleRemoveFurniture = (id: string) => {
    setPlacedFurniture(placedFurniture.filter((fur) => fur.id !== id))
    if (selectedFurnitureId === id) {
      setSelectedFurnitureId(null)
    }
  }

  const handleChangeConfig = (value: React.SetStateAction<IRoomConfig>) => {
    setConfig(value)
  }

  const handleSaveConfig = () => {
    const dataToSave: DataForLS = {
      config,
      placedFurniture,
      timestamp: new Date().toISOString(),
    }

    saveConfigToLS(dataToSave)
  }

  const handleClearConfiguration = () => {
    if (confirm('Вы уверены? Это удалит всю мебель и сбросит настройки.')) {
      setPlacedFurniture([])
      setConfig({
        floorColor: '#d4a574',
        wallColor: '#e8e8e8',
        lighting: 1,
      })
      setSelectedFurnitureId(null)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  useEffect(() => {
    const parsedData = loadConfigFromLS()

    if (parsedData) {
      if (parsedData.config) {
        setConfig(parsedData.config)
      } else {
        setConfig(defaultConfig)
      }

      if (parsedData.placedFurniture && Array.isArray(parsedData.placedFurniture)) {
        setPlacedFurniture(parsedData.placedFurniture)
      } else {
        setPlacedFurniture([])
      }
    } else {
      setConfig(defaultConfig)
      setPlacedFurniture([])
    }
  }, [])

  return (
    <div className="flex flex-row-reverse w-full px-10 justify-center gap-10">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <button
          onClick={handleSaveConfig}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2"
        >
          <span>💾</span>
          Сохранить
        </button>
        <button
          onClick={loadConfigFromLS}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2"
        >
          <span>📂</span>
          Загрузить
        </button>
        <button
          onClick={handleClearConfiguration}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2"
        >
          <span>🗑️</span>
          Очистить
        </button>
      </div>

      <FurnitureSelector config={config} onChangeConfig={handleChangeConfig} />

      <ConfiguratorCanvas
        config={config}
        orbitControlsRef={orbitControlsRef}
        placedFurniture={placedFurniture}
        onUpdateFurniturePosition={handleUpdateFurniturePosition}
        selectedFurnitureId={selectedFurnitureId}
        onSelectFurniture={setSelectedFurnitureId}
        onUpdateFurnitureScale={handleUpdateFurnitureScale}
      />

      <ConfigSettings
        catalogData={catalogData}
        placedFurniture={placedFurniture}
        onAddFurniture={handleAddFurniture}
        onRemoveFurniture={handleRemoveFurniture}
        selectedFurnitureId={selectedFurnitureId}
        onSelectFurniture={setSelectedFurnitureId}
        onUpdateScale={handleUpdateFurnitureScale}
      />
    </div>
  )
}
