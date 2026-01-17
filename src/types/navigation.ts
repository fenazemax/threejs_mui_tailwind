export const ViewModes = {
  VIEW_MODE: 'View Mode',
  CONFIG_MODE: 'Config Mode',
  EDIT_MODE: 'Edit Mode',
  LIGHT_MODE: 'Light Mode',
  MONITOR_MODE: 'Monitor Mode',
} as const

export type TViewModes = (typeof ViewModes)[keyof typeof ViewModes]
