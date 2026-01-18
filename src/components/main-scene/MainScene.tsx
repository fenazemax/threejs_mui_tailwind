import { Canvas } from '@react-three/fiber'
import React from 'react'
import { AppMesh } from '@components/threejs-components'
import { CoffeeTable } from '@ui/catalog-components'
import { OrbitControls } from '@react-three/drei'

export const MainScene: React.FC = () => {
  return (
    <div className="w-[50%] my-40 h-100 m-auto">
      <Canvas camera={{ position: [40, 40, 40], fov: 110 }}>
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[5, 5, 5]} intensity={1} />

        <AppMesh>
          <CoffeeTable />
        </AppMesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
