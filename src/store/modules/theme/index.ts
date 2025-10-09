import { computed } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui'
import { useSettingsStore } from '../settings'
import {
  LIGHT_PRIMARY_COLOR,
  LIGHT_INFO_COLOR,
  LIGHT_SUCCESS_COLOR,
  LIGHT_WARNING_COLOR,
  LIGHT_ERROR_COLOR,
  DARK_PRIMARY_COLOR,
  DARK_INFO_COLOR,
  DARK_SUCCESS_COLOR,
  DARK_WARNING_COLOR,
  DARK_ERROR_COLOR,
  BORDER_RADIUS,
  FONT_WEIGHT_STRONG
} from './constants'
import { getThemeColors } from './utils'

export const useThemeStore = defineStore('theme-store', () => {
  const settingsStore = useSettingsStore()

  const naiveTheme = computed(() => (settingsStore.theme === 'dark' ? darkTheme : lightTheme))

  const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => {
    const theme = settingsStore.theme
    const primaryColor = settingsStore.settings.primaryColor
    const themeColors = getThemeColors({
      primary:
        primaryColor === 'default'
          ? theme === 'dark'
            ? DARK_PRIMARY_COLOR
            : LIGHT_PRIMARY_COLOR
          : primaryColor,
      info: theme === 'dark' ? DARK_INFO_COLOR : LIGHT_INFO_COLOR,
      success: theme === 'dark' ? DARK_SUCCESS_COLOR : LIGHT_SUCCESS_COLOR,
      warning: theme === 'dark' ? DARK_WARNING_COLOR : LIGHT_WARNING_COLOR,
      error: theme === 'dark' ? DARK_ERROR_COLOR : LIGHT_ERROR_COLOR
    })
    return {
      common: {
        ...themeColors,
        borderRadius: BORDER_RADIUS,
        fontWeightStrong: FONT_WEIGHT_STRONG
      }
    }
  })

  return { naiveTheme, naiveThemeOverrides }
})
