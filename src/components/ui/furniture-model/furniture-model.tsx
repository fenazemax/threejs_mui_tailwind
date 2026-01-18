import { useLoader } from '@react-three/fiber'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Center } from '@react-three/drei'

interface FurnitureModelProps {
  modelPath: string
}

export const FurnitureModel: React.FC<FurnitureModelProps> = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath)
  return (
    <Center>
      <primitive object={gltf.scene} />
    </Center>
  )
}
