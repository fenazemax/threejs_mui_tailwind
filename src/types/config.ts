import type { FurnitureItem } from '@/types/data'

export interface IPlacedFurniture {
  id: string
  item: FurnitureItem
  position: [number, number, number]
  rotation: number
  scale: number
}

export interface IRoomConfig {
  floorColor: string
  wallColor: string
  lighting: number
}

export interface DataForLS {
  config: IRoomConfig
  placedFurniture: IPlacedFurniture[]
  timestamp: string
}
