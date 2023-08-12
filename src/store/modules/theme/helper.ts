import { cloneDeep } from 'lodash-es'
import type { GlobalThemeOverrides } from 'naive-ui'
import { themeSetting } from '@/settings'
import { addColorAlpha, getColorPalette, sessionStg } from '@/utils'

/**
 * 初始化主题配置
 * @returns
 */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD

  const storageSettings = sessionStg.get('themeSettings')

  if (isProd && storageSettings) {
    return storageSettings
  }

  const themeColor = sessionStg.get('themeColor') || themeSetting.themeColor
  const info = themeSetting.isCustomizeInfoColor
    ? themeSetting.otherColor.info
    : getColorPalette(themeColor, 7)
  const otherColor = { ...themeSetting.otherColor, info }
  return cloneDeep({ ...themeSetting, themeColor, otherColor })
}

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type ColorKey = `${ColorType}Color${ColorScene}`
type ThemeColor = Partial<Record<ColorKey, string>>

interface ColorAction {
  scene: ColorScene
  handler: (color: string) => string
}

function getThemeColors(colors: [ColorType, string][]) {
  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: (color) => getColorPalette(color, 6) },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) }
  ]

  const themeColor: ThemeColor = {}

  for (const color of colors) {
    const [colorType, colorValue] = color
    for (const action of colorActions) {
      const colorKey: ColorKey = `${colorType}Color${action.scene}`
      themeColor[colorKey] = action.handler(colorValue)
    }
  }

  return themeColor
}

/**
 * 获取 naive 的主题颜色
 * @param colors
 * @returns
 */
export function getNaiveThemeOverrides(colors: Record<ColorType, string>): GlobalThemeOverrides {
  const { primary, success, warning, error } = colors

  const info = themeSetting.isCustomizeInfoColor ? colors.info : getColorPalette(primary, 7)

  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error]
  ])

  const colorLoading = primary
  return {
    common: {
      fontWeightStrong: '600',
      ...themeColors
    },
    LoadingBar: {
      colorLoading
    }
  }
}
