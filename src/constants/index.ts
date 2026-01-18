import type { FurnitureItem } from '@/types/data'

export const DARK_THEME_LABEL = 'Темная тема'

export const LIGHT_THEME_LABEL = 'Светлая тема'

const MODEL_PATH = './src/assets/models'

export const catalogData: FurnitureItem[] = [
  {
    id: '1',
    category: 'tables',
    name: 'coffee table',
    modelPath: `${MODEL_PATH}/coffee_table/coffee_table.gltf?url`,
  },
  {
    id: '2',
    category: 'chairs',
    name: 'antique chair',
    modelPath: `${MODEL_PATH}/antique_chair/scene.gltf?url`,
  },
  {
    id: '3',
    category: 'cabinets',
    name: 'kitchen cabinet',
    modelPath: `${MODEL_PATH}/base_cabinet/scene.gltf?url`,
  },
  {
    id: '4',
    category: 'cabinets',
    name: 'wooden cabinet',
    modelPath: `${MODEL_PATH}/wooden_cabinet/scene.gltf?url`,
  },
  {
    id: '5',
    category: 'chairs',
    name: 'victorian_chairs',
    modelPath: `${MODEL_PATH}/victorian_chairs/scene.gltf?url`,
  },
]
