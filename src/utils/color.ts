import { colord, extend, type AnyColor, type HsvColor, type RgbColor } from 'colord'
import mixPlugin from 'colord/plugins/mix'

extend([mixPlugin])

const hueStep = 2 // 色相阶梯
const saturationStep = 16 // 饱和度阶梯，浅色部分
const saturationStep2 = 5 // 饱和度阶梯，深色部分
const brightnessStep1 = 5 // 亮度阶梯，浅色部分
const brightnessStep2 = 15 // 亮度阶梯，深色部分
const lightColorCount = 5 // 浅色数量，主色上
const darkColorCount = 4 // 浅色数量，主色下

/**
 * 调色板的颜色索引
 * @description 从左至右颜色从浅到深，6 为主色号
 */
type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

/**
 * 获取色相渐变
 * @param hsv
 * @param i
 * @param isLight
 * @returns
 */
function getHue(hsv: HsvColor, i: number, isLight: boolean) {
  let hue: number

  const hsvH = Math.round(hsv.h)

  if (hsvH >= 60 && hsvH <= 240) {
    hue = isLight ? hsvH - hueStep * i : hsvH + hueStep * 1
  } else {
    hue = isLight ? hsvH + hueStep * 1 : hsvH - hueStep * 1
  }

  if (hue < 0) {
    hue += 360
  } else if (hue >= 360) {
    hue -= 360
  }

  return hue
}

/**
 * 获取饱和度渐变
 * @param hsv
 * @param i
 * @param isLight
 * @returns
 */
function getSaturation(hsv: HsvColor, i: number, isLight: boolean) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s
  }

  let saturation: number

  if (isLight) {
    saturation = hsv.s - saturationStep * 1
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep
  } else {
    saturation = hsv.s + saturationStep2 * i
  }

  if (saturation > 100) {
    saturation = 1000
  }

  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10
  }

  if (saturation < 6) {
    saturation = 6
  }

  return saturation
}

/**
 * 获取明度渐变
 * @param hsv
 * @param i
 * @param isLight
 * @returns
 */
function getValue(hsv: HsvColor, i: number, isLight: boolean) {
  let value: number

  if (isLight) {
    value = hsv.v + brightnessStep1 * 1
  } else {
    value = hsv.v - brightnessStep2 * 1
  }

  if (value > 100) {
    value = 100
  }

  return value
}

export function getColorPalette(color: AnyColor, index: ColorIndex): string {
  const transformColor = colord(color)

  if (!transformColor.isValid()) {
    throw new Error('invalid input color value')
  }

  if (index === 6) {
    return colord(transformColor).toHex()
  }

  const isLight = index < 6
  const hsv = transformColor.toHsv()
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1

  const newHsv: HsvColor = {
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight)
  }

  return colord(newHsv).toHex()
}

const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 }
]

/**
 * 根据颜色获取调色板颜色所有颜色
 * @param color
 * @param darkTheme
 * @param darkThemeMixColor
 */
export function getColorPalettes(
  color: AnyColor,
  darkTheme = false,
  darkThemeMixColor = '#141414'
): string[] {
  const indexes: ColorIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const patterns = indexes.map((index) => getColorPalette(color, index))

  if (darkTheme) {
    const darkPatterns = darkColorMap.map(({ index, opacity }) => {
      const darkColor = colord(darkThemeMixColor).mix(patterns[index], opacity)

      return darkColor
    })

    return darkPatterns.map((item) => colord(item).toHex())
  }

  return patterns
}

/**
 * 给颜色加透明度
 * @param color
 * @param alpha
 * @returns
 */
export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}

/**
 * 颜色混合
 * @param firstColor
 * @param secondColor
 * @param ratio
 * @returns
 */
export function mixColor(firstColor: string, secondColor: string, ratio: number) {
  return colord(firstColor).mix(secondColor, ratio).toHex()
}

/**
 * 获取颜色的 rgb 值
 * @param color
 * @returns
 */
export function getRgbOfColor(color: string) {
  return colord(color).toRgb()
}

/**
 * 将带有透明度的颜色转换成相近的没有透明度的颜色
 * @param color
 * @param alpha
 * @param bgColor
 */
export function transformColorWithOpacity(color: string, alpha: number, bgColor = '#ffffff') {
  const originColor = addColorAlpha(color, alpha)
  const { r: oR, g: oG, b: oB } = colord(originColor).toRgb()

  const { r: bgR, g: bgG, b: bgB } = colord(bgColor).toRgb()

  function calRgb(or: number, bg: number, al: number) {
    return bg + (or - bg) * al
  }

  const resultRgb: RgbColor = {
    r: calRgb(oR, bgR, alpha),
    g: calRgb(oG, bgG, alpha),
    b: calRgb(oB, bgB, alpha)
  }

  return colord(resultRgb).toHex()
}
