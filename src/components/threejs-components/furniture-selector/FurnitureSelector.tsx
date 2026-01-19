import type { IRoomConfig } from '@/types/config'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Slider } from '@mui/material'
import React from 'react'

interface FurnitureSelectorProps {
  config: IRoomConfig
  onChangeConfig: (value: React.SetStateAction<IRoomConfig>) => void
}

export const FurnitureSelector: React.FC<FurnitureSelectorProps> = (props) => {
  const { config, onChangeConfig } = props

  return (
    <div className="w-[25%]">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>Пол и стены</AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label>Цвет пола</label>
              <input type="color" value={config.floorColor} onChange={(e) => onChangeConfig({ ...config, floorColor: e.target.value })} />
            </div>
            <div className="flex gap-1 items-center">
              <label>Цвет стен</label>
              <input type="color" value={config.wallColor} onChange={(e) => onChangeConfig({ ...config, wallColor: e.target.value })} />
            </div>
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
            onChange={(_, val) => onChangeConfig({ ...config, lighting: val as number })}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
