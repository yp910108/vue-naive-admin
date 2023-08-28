import type { Settings } from './typing'
import settingsJson from './settings.json'

export const settings = settingsJson as Settings
export * from './typing'
export * from './color'
