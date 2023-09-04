import { effectScope, onScopeDispose, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useOsTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { kebabCase } from 'lodash-es'
import { getColorPalettes, getRgbOfColor } from '@/utils'
import { useThemeStore } from '../modules'

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
