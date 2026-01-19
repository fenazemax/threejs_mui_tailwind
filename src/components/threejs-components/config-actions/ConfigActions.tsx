import { Button } from '@ui/button'
import type { DataForLS } from '@/types/config'
import React from 'react'

interface ConfigActionsProps {
  onSaveConfig: () => void
  onClearConfiguration: () => void
  loadConfigFromLS: () => DataForLS | null
}

export const ConfigActions: React.FC<ConfigActionsProps> = (props) => {
  const { loadConfigFromLS, onClearConfiguration, onSaveConfig } = props

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
      <Button onClick={onSaveConfig} tailwindClasses=" text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
        Сохранить
      </Button>
      <Button onClick={loadConfigFromLS} tailwindClasses=" text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
        Загрузить
      </Button>
      <Button onClick={onClearConfiguration} tailwindClasses=" text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
        Очистить
      </Button>
    </div>
  )
}
