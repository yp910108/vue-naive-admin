import { composite } from 'seemly'

const createHoverColor = (color: string): string => {
  return composite(color, [255, 255, 255, 0.16])
}

const createPressedColor = (color: string): string => {
  return composite(color, [0, 0, 0, 0.12])
}

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'

type ColorScene = '' | 'Hover' | 'Pressed' | 'Suppl'

type ColorKey = `${ColorType}Color${ColorScene}`

type ThemeColors = Partial<Record<ColorKey, string>>

interface ColorAction {
  scene: ColorScene
  handler: (color: string) => string
}

export const getThemeColors = (colors: Record<ColorType, string>) => {
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
    { scene: 'Hover', handler: (color) => createHoverColor(color) },
    { scene: 'Pressed', handler: (color) => createPressedColor(color) },
    { scene: 'Suppl', handler: (color) => color }
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
