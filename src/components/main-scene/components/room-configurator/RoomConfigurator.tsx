import { Room } from '@ui/room'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Slider } from '@mui/material'
import { Canvas } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import type { FurnitureItem } from '@/types/data'
import { catalogData } from '@/constants'
import { DraggableFurniture } from '@/components/threejs-components'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

interface IRoomConfig {
  floorColor: string
  wallColor: string
  lighting: number
}

interface IPlacedFurniture {
  id: string
  item: FurnitureItem
  position: [number, number, number]
  rotation: number
}

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

  return (
    <div className="flex flex-row-reverse w-full px-10 justify-center gap-10">
      <div className="w-[25%]">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>Пол и стены</AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label>Цвет пола</label>
                <input type="color" value={config.floorColor} onChange={(e) => setConfig({ ...config, floorColor: e.target.value })} />
              </div>
              <div className="flex gap-1 items-center">
                <label>Цвет стен</label>
                <input type="color" value={config.wallColor} onChange={(e) => setConfig({ ...config, wallColor: e.target.value })} />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>Освещение</AccordionSummary>
          <AccordionDetails>
            <Slider
              value={config.lighting}
              min={0.1}
              max={2}
              step={0.1}
              onChange={(_, val) => setConfig({ ...config, lighting: val as number })}
            />
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="h-150 w-[75%]">
        <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
          <color attach="background" args={['#1a1a2e']} />
          <Room floorColor={config.floorColor} wallColor={config.wallColor} />

          <ambientLight intensity={config.lighting * 0.5} />
          <directionalLight position={[5, 10, 5]} intensity={config.lighting} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={config.lighting * 0.3} />

          {placedFurniture.map((furniture) => (
            <DraggableFurniture
              key={furniture.id}
              modelPath={furniture.item.modelPath}
              position={furniture.position}
              scale={furniture.item.defaultScale}
              orbitControlsRef={orbitControlsRef}
              onPositionChange={(newPos) => handleUpdateFurniturePosition(furniture.id, newPos)}
            />
          ))}
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} ref={orbitControlsRef} />
          <gridHelper args={[20, 20]} />
        </Canvas>
      </div>

      <div className="w-64 bg-gray-800 p-4">
        <h3 className="text-white mb-4">Добавить мебель</h3>

        {catalogData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleAddFurniture(item)}
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
            <button onClick={() => handleRemoveFurniture(item.id)} className="text-red-500">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
