import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useOsTheme, type GlobalThemeOverrides } from 'naive-ui'
import { kebabCase } from 'lodash-es'
import { useEventListener } from '@vueuse/core'
import { getColorPalettes, getRgbOfColor, localStg, sessionStg } from '@/utils'
import { useThemeStore } from '../modules'

const DARK_CLASS = 'dark'

/**
 * 将 dark 类名添加到 document.documentELement
 */
const addDarkClassToDocument = () => {
  document.documentElement.classList.add(DARK_CLASS)
}

/**
 * 将 dark 类名从 document.documentELement 移除
 */
const removeDarkClassFromDocument = () => {
  document.documentElement.classList.remove(DARK_CLASS)
}

type ThemeVars = Exclude<GlobalThemeOverrides['common'], undefined>
type ThemeVarsKeys = keyof ThemeVars

const addThemeCssVarsToHtml = (themeVars: ThemeVars) => {
  const keys = Object.keys(themeVars) as ThemeVarsKeys[]
  const style: string[] = []
  for (const key of keys) {
    if (!key.includes('Color')) continue
    const color = themeVars[key]
    if (color) {
      const { r, g, b } = getRgbOfColor(color)
      style.push(`--${kebabCase(key)}: ${r}, ${g}, ${b}`)
      if (key === 'primaryColor') {
        const colorPalettes = getColorPalettes(color)
        colorPalettes.forEach((palette, index) => {
          const { r: pR, g: pG, b: pB } = getRgbOfColor(palette)
          style.push(`--${kebabCase(key)}-${index + 1}: ${pR}, ${pG}, ${pB}`)
        })
      }
    }
  }
  const styleStr = style.join(';')
  document.documentElement.style.cssText += styleStr
}

export default function subscribeThemeStore() {
  const themeStore = useThemeStore()
  const { theme, naiveThemeOverrides } = storeToRefs(themeStore)
  const osTheme = useOsTheme()

  watch(
    osTheme,
    (newVal) => {
      const isDark = newVal === 'dark'
      if (!localStg.get('theme') && theme.value.followSystemTheme) {
        themeStore.setDarkMode(isDark)
      }
    },
    { immediate: true }
  )

  watch(
    () => theme.value.darkMode,
    (newDarkMode) => {
      if (newDarkMode) {
        addDarkClassToDocument()
      } else {
        removeDarkClassFromDocument()
      }
    },
    { immediate: true }
  )

  watch(
    naiveThemeOverrides,
    (newValue) => {
      if (newValue.common) {
        addThemeCssVarsToHtml(newValue.common)
      }
    },
    { immediate: true }
  )

  useEventListener(window, 'beforeunload', () => {
    sessionStg.set('settings', theme.value)
  })
}
