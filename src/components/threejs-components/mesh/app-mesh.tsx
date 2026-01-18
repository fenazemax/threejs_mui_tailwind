import React, { useRef } from 'react'
import { Mesh } from 'three'

interface AppMeshProps {
  children: React.ReactNode
}

export const AppMesh: React.FC<AppMeshProps> = ({ children }) => {
  const meshRef = useRef<Mesh>(null)

  return <mesh ref={meshRef}>{children}</mesh>
}
