import type { Settings } from '@/store'
import settingsJson from './settings.json'

export const settings = settingsJson as Settings
export * from './color'
