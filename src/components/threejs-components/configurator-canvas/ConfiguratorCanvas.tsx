import { Room } from '@ui/room'
import type { IPlacedFurniture, IRoomConfig } from '@/types/config'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { DraggableFurniture } from '@components/threejs-components'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'

interface ConfiguratorCanvasProps {
  placedFurniture: IPlacedFurniture[]
  config: IRoomConfig
  orbitControlsRef: React.RefObject<OrbitControlsImpl | null>
  selectedFurnitureId: string | null
  onUpdateFurniturePosition: (id: string, newPosition: [number, number, number]) => void
  onSelectFurniture: (id: string) => void
  onUpdateFurnitureScale: (id: string, scale: number) => void
}

export const ConfiguratorCanvas: React.FC<ConfiguratorCanvasProps> = (props) => {
  const {
    config,
    orbitControlsRef,
    placedFurniture,
    selectedFurnitureId,
    onSelectFurniture,
    onUpdateFurniturePosition,
    onUpdateFurnitureScale,
  } = props

  return (
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
            scale={furniture.scale} // Используем scale из state
            isSelected={selectedFurnitureId === furniture.id} // НОВОЕ
            onSelect={() => onSelectFurniture(furniture.id)} // НОВОЕ
            orbitControlsRef={orbitControlsRef}
            onPositionChange={(newPos) => onUpdateFurniturePosition(furniture.id, newPos)}
            onScaleChange={(newScale) => onUpdateFurnitureScale(furniture.id, newScale)} // НОВОЕ
          />
        ))}
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} ref={orbitControlsRef} />
        <gridHelper args={[20, 20]} />
      </Canvas>
    </div>
  )
}
