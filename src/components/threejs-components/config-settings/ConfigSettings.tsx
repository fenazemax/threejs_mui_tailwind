import type { IPlacedFurniture } from '@/types/config'
import type { FurnitureItem } from '@/types/data'
import React from 'react'

interface ConfigSettingsProps {
  placedFurniture: IPlacedFurniture[]
  catalogData: FurnitureItem[]
  onAddFurniture: (item: FurnitureItem) => void
  onRemoveFurniture: (id: string) => void
  selectedFurnitureId: string | null
  onSelectFurniture: (id: string) => void
  onUpdateScale: (id: string, scale: number) => void
}

export const ConfigSettings: React.FC<ConfigSettingsProps> = (props) => {
  const { placedFurniture, catalogData, onAddFurniture, onRemoveFurniture, onSelectFurniture, onUpdateScale, selectedFurnitureId } = props
  return (
    <div className="w-64 bg-gray-800 p-4 overflow-y-auto max-h-screen">
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

      <hr className="my-4 border-gray-600" />

      <h3 className="text-white mb-4">В комнате:</h3>

      {placedFurniture.length === 0 && <p className="text-gray-400 text-sm">Пусто. Добавьте мебель выше.</p>}

      {placedFurniture.map((item) => (
        <div
          key={item.id}
          className={`mb-4 p-3 border rounded cursor-pointer transition-colors ${
            selectedFurnitureId === item.id ? 'border-blue-500 bg-blue-900/30' : 'border-gray-600 hover:border-gray-500'
          }`}
          onClick={() => onSelectFurniture(item.id)}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">{item.item.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemoveFurniture(item.id)
              }}
              className="text-red-500 hover:text-red-400 font-bold"
            >
              ✕
            </button>
          </div>

          {selectedFurnitureId === item.id && (
            <div className="mt-3 space-y-2">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Размер: {item.scale.toFixed(2)}</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.05"
                  value={item.scale}
                  onChange={(e) => {
                    e.stopPropagation()
                    onUpdateScale(item.id, parseFloat(e.target.value))
                  }}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Мин</span>
                  <span>Макс</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpdateScale(item.id, Math.max(0.1, item.scale - 0.1))
                  }}
                  className="flex-1 bg-gray-700 text-white py-1 rounded text-sm hover:bg-gray-600"
                >
                  −
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpdateScale(item.id, item.scale || 1)
                  }}
                  className="flex-1 bg-gray-700 text-white py-1 rounded text-sm hover:bg-gray-600"
                >
                  Сброс
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpdateScale(item.id, Math.min(3, item.scale + 0.1))
                  }}
                  className="flex-1 bg-gray-700 text-white py-1 rounded text-sm hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
