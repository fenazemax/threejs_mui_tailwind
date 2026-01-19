import { DoubleSide } from 'three'

interface RoomProps {
  floorColor?: string
  wallColor?: string
}

export const Room: React.FC<RoomProps> = ({ floorColor = '#d4a574', wallColor = '#e8e8e8' }) => {
  const roomWidth = 10
  const roomDepth = 10
  const wallHeight = 3

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>

      <mesh position={[0, wallHeight / 2, -roomDepth / 2]} receiveShadow>
        <boxGeometry args={[roomWidth, wallHeight, 0.1]} />
        <meshStandardMaterial color={wallColor} side={DoubleSide} />
      </mesh>

      <mesh position={[-roomWidth / 2, wallHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[0.1, wallHeight, roomDepth]} />
        <meshStandardMaterial color={wallColor} side={DoubleSide} />
      </mesh>

      <mesh position={[roomWidth / 2, wallHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[0.1, wallHeight, roomDepth]} />
        <meshStandardMaterial color={wallColor} side={DoubleSide} />
      </mesh>
    </group>
  )
}
