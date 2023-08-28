import { effectScope, onScopeDispose, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { kebabCase } from 'lodash-es'
import { useOsTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { getColorPalettes, getRgbOfColor, sessionStg } from '@/utils'
import { useThemeStore } from '../modules'

const DARK_CLASS = 'dark'

function addDarkClass() {
  document.documentElement.classList.add(DARK_CLASS)
}

function removeDarkClass() {
  document.documentElement.classList.remove(DARK_CLASS)
}

type ThemeVars = Exclude<GlobalThemeOverrides['common'], undefined>
type ThemeVarsKeys = keyof ThemeVars

function addThemeCssVarsToHtml(themeVars: ThemeVars) {
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

  const scope = effectScope()

  scope.run(() => {
    watch(
      () => theme.value.themeColor,
      (newVal) => {
        sessionStg.set('themeColor', newVal)
      },
      { immediate: true }
    )
    watch(
      () => theme.value.darkMode,
      (newVal) => {
        if (newVal) {
          addDarkClass()
        } else {
          removeDarkClass()
        }
      },
      { immediate: true }
    )

    watch(
      osTheme,
      (newVal) => {
        const isDark = newVal === 'dark'
        if (theme.value.followSystemTheme) {
          themeStore.setDarkMode(isDark)
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
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
