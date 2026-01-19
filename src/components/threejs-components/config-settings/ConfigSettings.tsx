import type { IPlacedFurniture } from '@/types/config'
import type { FurnitureItem } from '@/types/data'
import React from 'react'

interface ConfigSettingsProps {
  placedFurniture: IPlacedFurniture[]
  catalogData: FurnitureItem[]
  onAddFurniture: (item: FurnitureItem) => void
  onRemoveFurniture: (id: string) => void
}

export const ConfigSettings: React.FC<ConfigSettingsProps> = (props) => {
  const { placedFurniture, catalogData, onAddFurniture, onRemoveFurniture } = props
  return (
    <div className="w-64 bg-gray-800 p-4">
      <h3 className="text-white mb-4">Добавить мебель</h3>

      {catalogData.map((item) => (
        <button
          key={item.id}
          onClick={() => onAddFurniture(item)}
          className="w-full bg-blue-500 text-white p-2 mb-2 rounded hover:bg-blue-600"
        >
          + {item.name}
        </button>
      ))}

      <hr className="my-4" />

      <h3 className="text-white mb-4">В комнате:</h3>
      {placedFurniture.map((item) => (
        <div key={item.id} className="text-white flex justify-between mb-2">
          <span>{item.item.name}</span>
          <button onClick={() => onRemoveFurniture(item.id)} className="text-red-500">
            X
          </button>
        </div>
      ))}
    </div>
  )
}
