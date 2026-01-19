import { STORAGE_KEY } from '@/constants'
import type { DataForLS } from '@/types/config'

export const saveConfigToLS = (data: DataForLS) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
