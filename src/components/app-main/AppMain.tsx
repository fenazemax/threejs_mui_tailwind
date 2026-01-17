import React from 'react'
import { Button } from '@components/ui/button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

interface AppMainProps {
  children: React.ReactNode
  onToggleDrawer: () => void
}

export const AppMain: React.FC<AppMainProps> = ({ children, onToggleDrawer }) => {
  return (
    <main className="w-full">
      <Button onClick={onToggleDrawer} tailwindClasses="mx-5">
        <ArrowBackIosIcon />
      </Button>
      {children}
    </main>
  )
}
