export interface FurnitureItem {
  id: string
  name: string
  modelPath: string
  thumbnail?: string
  category: 'chairs' | 'tables' | 'cabinets'
  defaultScale?: number
}

export type TCatalogCategories = 'chairs' | 'tables' | 'cabinets'
