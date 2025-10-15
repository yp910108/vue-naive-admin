import { computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui'
import { darkThemeCommonVars, lightThemeCommonVars } from '@/settings'
import { useSettingsStore } from '../settings'
import { getThemeColors } from './utils'

export const useThemeStore = defineStore('theme-store', () => {
  const { settings, theme } = storeToRefs(useSettingsStore())

  const naiveTheme = computed(() => (theme.value === 'dark' ? darkTheme : lightTheme))

  const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => {
    const themeCommonVars = theme.value === 'dark' ? darkThemeCommonVars : lightThemeCommonVars
    const primaryColor =
      settings.value.primaryColor === 'default'
        ? themeCommonVars.primaryColor
        : settings.value.primaryColor
    const themeColors = getThemeColors({
      primary: primaryColor,
      info: primaryColor,
      success: themeCommonVars.successColor,
      warning: themeCommonVars.warningColor,
      error: themeCommonVars.errorColor
    })
    return { common: { ...themeCommonVars, ...themeColors } }
  })

  return { naiveTheme, naiveThemeOverrides }
})
