import type { Settings } from './typings'
import settingsJson from './settings.json'
import colors from './colors.json'

export * from './typings'
export const settings = settingsJson as Settings
export { colors }
