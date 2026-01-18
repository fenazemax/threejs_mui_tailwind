import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { AppMesh } from '@components/threejs-components'
import { FurnitureModel } from '@ui/furniture-model'
import { Bounds, OrbitControls } from '@react-three/drei'
import type { FurnitureItem } from '@/types/data'

interface MainSceneProps {
  selectedItem: FurnitureItem | null
}

export const MainScene: React.FC<MainSceneProps> = (props) => {
  const { selectedItem } = props

  if (!selectedItem) return <span>Выберите предмет из каталога</span>

  return (
    <div className="flex flex-col h-170 justify-center w-screen">
      <span className="text-center mt-10">"{selectedItem.name.toUpperCase()}"</span>

      <div className="w-[50%] h-full m-auto flex-1 border border-gray-200 rounded-lg">
        <Canvas camera={{ position: [40, 40, 40], fov: 60 }}>
          <directionalLight position={[5, 10, 7]} intensity={1.2} />
          <directionalLight position={[-5, 5, -3]} intensity={0.4} />
          <directionalLight position={[0, 5, -10]} intensity={0.6} />

          <ambientLight intensity={0.2} />

          <Suspense fallback={null}>
            {selectedItem && (
              <Bounds fit clip observe margin={1.2}>
                <AppMesh>
                  <FurnitureModel modelPath={selectedItem.modelPath} />
                </AppMesh>
              </Bounds>
            )}
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}
