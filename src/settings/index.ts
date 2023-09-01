import type { Settings } from './typing'
import settingsJson from './settings.json'
import colors from './colors.json'

export * from './typing'
export const settings = settingsJson as Settings
export { colors }
