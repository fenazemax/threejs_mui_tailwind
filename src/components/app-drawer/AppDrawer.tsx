import { Drawer } from '@mui/material'
import React from 'react'
import { DrawerList } from './drawer-list'

interface AppDrawerProps {
  isOpen: boolean
  onToggleOpen: () => void
}

export const AppDrawer: React.FC<AppDrawerProps> = (props) => {
  const { isOpen, onToggleOpen } = props

  return (
    <Drawer open={isOpen} onClose={onToggleOpen}>
      <DrawerList />
    </Drawer>
  )
}
