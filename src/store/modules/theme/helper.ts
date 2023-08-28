import { cloneDeep } from 'lodash-es'
import { settings } from '@/settings'
import { getColorPalette, sessionStg } from '@/utils'

/**
 * 初始化主题配置
 * @returns
 */
export function initSettings() {
  const primaryColor = sessionStg.get('primaryColor') ?? settings.primaryColor
  const infoColor = settings.isCustomizeInfoColor ? settings.otherColor.info : primaryColor
  const otherColor = { ...settings.otherColor, info: infoColor }
  return cloneDeep({ ...settings, primaryColor, otherColor })
}

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
type ColorScene = '' | 'Hover' | 'Pressed' | 'Suppl'
type ColorKey = `${ColorType}Color${ColorScene}`
type ThemeColors = Partial<Record<ColorKey, string>>

interface ColorAction {
  scene: ColorScene
  handler: (color: string) => string
}

export function getThemeColors(colors: Record<ColorType, string>) {
  const { primary, info, success, warning, error } = colors

  const colorTypeVals: [ColorType, string][] = [
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error]
  ]

  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: (color) => getColorPalette(color, 7) },
    { scene: 'Suppl', handler: (color) => getColorPalette(color, 5) }
  ]

  const themeColors: ThemeColors = {}

  for (const color of colorTypeVals) {
    const [colorType, colorValue] = color
    for (const action of colorActions) {
      const colorKey: ColorKey = `${colorType}Color${action.scene}`
      themeColors[colorKey] = action.handler(colorValue)
    }
  }

  return themeColors
}
