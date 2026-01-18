import { Drawer } from '@mui/material'
import React from 'react'
import { catalogData } from '@/constants'
import type { FurnitureItem } from '@/types/data'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Accordion, AccordionDetails, AccordionSummary, List, ListItemButton, ListItemText } from '@mui/material'

interface AppDrawerProps {
  isOpen: boolean
  onToggleOpen: () => void
  onSelectItem: (item: FurnitureItem) => void
}

export const AppDrawer: React.FC<AppDrawerProps> = (props) => {
  const { isOpen, onToggleOpen, onSelectItem } = props
  const categories = {
    chairs: catalogData.filter((item) => item.category === 'chairs'),
    tables: catalogData.filter((item) => item.category === 'tables'),
    cabinets: catalogData.filter((item) => item.category === 'cabinets'),
  }

  return (
    <Drawer open={isOpen} onClose={onToggleOpen} sx={{ width: 240 }}>
      <Accordion className="p-5">
        <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>Tables</AccordionSummary>
        <AccordionDetails>
          <List>
            {categories.tables.map((item) => (
              <ListItemButton key={item.id} onClick={() => onSelectItem(item)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion className="p-5">
        <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>Chairs</AccordionSummary>
        <AccordionDetails>
          <List>
            {categories.chairs.map((item) => (
              <ListItemButton key={item.id} onClick={() => onSelectItem(item)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion className="p-5">
        <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>Cabinets</AccordionSummary>
        <AccordionDetails>
          <List>
            {categories.cabinets.map((item) => (
              <ListItemButton key={item.id} onClick={() => onSelectItem(item)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Drawer>
  )
}
