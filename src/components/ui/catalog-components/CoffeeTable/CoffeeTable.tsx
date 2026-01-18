import { useLoader } from '@react-three/fiber'
import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import coffeTableUrl from '@/assets/models/coffee_table/coffee_table.gltf?url'

export const CoffeeTable: React.FC = () => {
  const gltf = useLoader(GLTFLoader, coffeTableUrl)
  return <primitive object={gltf.scene} />
}
