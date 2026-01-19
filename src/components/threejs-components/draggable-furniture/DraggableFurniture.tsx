// components/DraggableFurniture.tsx
import { useEffect, useRef, useState } from 'react'
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
  isSelected?: boolean
  onSelect?: () => void
  onScaleChange?: (scale: number) => void
}

export const DraggableFurniture: React.FC<DraggableFurnitureProps> = (props) => {
  const { modelPath, position, scale = 1, isSelected = false, onSelect, onPositionChange, onScaleChange, orbitControlsRef } = props

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

    if (onSelect) {
      onSelect()
    }

    setIsDragging(true)

    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = false
    }

    document.body.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging && meshRef.current) {
      e.stopPropagation()

      const rect = gl.domElement.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.current.setFromCamera(new THREE.Vector2(x, y), camera)

      raycaster.current.ray.intersectPlane(planeRef.current, intersectionPoint.current)

      if (intersectionPoint.current) {
        const clampedX = THREE.MathUtils.clamp(intersectionPoint.current.x, -4, 4)
        const clampedZ = THREE.MathUtils.clamp(intersectionPoint.current.z, -4, 4)

        meshRef.current.position.x = clampedX
        meshRef.current.position.z = clampedZ
      }
    }
  }

  const handleWheel = (e: ThreeEvent<WheelEvent>) => {
    if (isSelected && onScaleChange) {
      e.stopPropagation()

      const delta = e.deltaY > 0 ? -0.05 : 0.05
      const newScale = Math.max(0.1, Math.min(3, scale + delta))

      onScaleChange(newScale)
    }
  }

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDragging) {
        setIsDragging(false)

        if (orbitControlsRef.current) {
          orbitControlsRef.current.enabled = true
        }

        document.body.style.cursor = 'auto'

        if (meshRef.current && onPositionChange) {
          onPositionChange([meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z])
        }
      }
    }

    window.addEventListener('pointerup', handleGlobalPointerUp)

    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp)
    }
  }, [isDragging, onPositionChange, orbitControlsRef])

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale)
    }
  }, [scale])

  return (
    <group
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        if (!isDragging) {
          document.body.style.cursor = 'grab'
        }
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
        if (!isDragging) {
          document.body.style.cursor = 'auto'
        }
      }}
    >
      <primitive object={gltf.scene.clone()} />

      {(isHovered || isSelected) && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.5, 32]} />
          <meshBasicMaterial color={isDragging ? '#00ff00' : isSelected ? '#0099ff' : '#ffff00'} transparent opacity={0.6} />
        </mesh>
      )}

      {isSelected && !isDragging && (
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial attach="material" color="#0099ff" linewidth={2} />
        </lineSegments>
      )}
    </group>
  )
}
