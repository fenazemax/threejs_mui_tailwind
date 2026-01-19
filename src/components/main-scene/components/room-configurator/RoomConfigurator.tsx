import { Room } from '@ui/room'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Slider } from '@mui/material'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { OrbitControls } from '@react-three/drei'

interface IRoomConfig {
  floorColor: string
  wallColor: string
  lighting: number
}

export const RoomConfigurator: React.FC = () => {
  const [config, setConfig] = useState<IRoomConfig>({
    floorColor: '#d4a574',
    wallColor: '#e8e8e8',
    lighting: 1,
  })

  return (
    <div className="flex flex-row-reverse w-full px-10 justify-between">
      <div>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>Пол и стены</AccordionSummary>
          <AccordionDetails>
            <div>
              <label>Цвет пола</label>
              <input type="color" value={config.floorColor} onChange={(e) => setConfig({ ...config, floorColor: e.target.value })} />
            </div>
            <div>
              <label>Цвет стен</label>
              <input type="color" value={config.wallColor} onChange={(e) => setConfig({ ...config, wallColor: e.target.value })} />
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
          <Room floorColor={config.floorColor} wallColor={config.wallColor} />
          <ambientLight intensity={config.lighting} />

          <OrbitControls makeDefault />
          <gridHelper args={[20, 20]} />
        </Canvas>
      </div>
    </div>
  )
}
