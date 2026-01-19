// components/DraggableFurniture.tsx
import { useRef, useState } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

interface DraggableFurnitureProps {
  modelPath: string
  position: [number, number, number]
  scale?: number
  orbitControlsRef: React.RefObject<OrbitControlsImpl | null>
  onPositionChange?: (position: [number, number, number]) => void
}

export const DraggableFurniture: React.FC<DraggableFurnitureProps> = ({
  modelPath,
  position,
  scale = 1,
  onPositionChange,
  orbitControlsRef,
}) => {
  const meshRef = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, modelPath)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const { camera, gl } = useThree()

  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0))
  const intersectionPoint = useRef(new THREE.Vector3())
  const raycaster = useRef(new THREE.Raycaster())

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsDragging(true)
    ;(e.target as any).setPointerCapture(e.pointerId)

    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = false
    }
  }

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsDragging(false)
    ;(e.target as any).releasePointerCapture(e.pointerId)

    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = true
    }

    if (meshRef.current && onPositionChange) {
      onPositionChange([meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z])
    }
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging && meshRef.current) {
      e.stopPropagation()
      meshRef.current.position.x = e.point.x
      meshRef.current.position.z = e.point.z

      const rect = gl.domElement.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.current.setFromCamera(new THREE.Vector2(x, y), camera)

      raycaster.current.ray.intersectPlane(planeRef.current, intersectionPoint.current)

      if (intersectionPoint.current) {
        const clampedX = THREE.MathUtils.clamp(intersectionPoint.current.x, -4.5, 4.5)
        const clampedZ = THREE.MathUtils.clamp(intersectionPoint.current.z, -4.5, 4.5)

        meshRef.current.position.x = clampedX
        meshRef.current.position.z = clampedZ
      }
    }
  }

  return (
    <group
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <primitive object={gltf.scene.clone()} />

      {isHovered && (
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial color="yellow" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  )
}
