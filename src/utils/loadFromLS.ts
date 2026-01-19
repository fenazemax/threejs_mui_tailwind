import { STORAGE_KEY } from '@/constants'
import type { DataForLS } from '@/types/config'

export const loadConfigFromLS = (): DataForLS | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)

    if (!savedData) {
      return null
    }

    const parsed = JSON.parse(savedData)

    if (parsed && typeof parsed === 'object') {
      return parsed as DataForLS
    }

    return null
  } catch (error) {
    console.error('Ошибка загрузки конфигурации из localStorage:', error)
    return null
  }
}
