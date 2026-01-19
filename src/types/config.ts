import type { FurnitureItem } from '@/types/data'

export interface IPlacedFurniture {
  id: string
  item: FurnitureItem
  position: [number, number, number]
  rotation: number
}

export interface IRoomConfig {
  floorColor: string
  wallColor: string
  lighting: number
}
