import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import { FONT_WEIGHT_STRONG, BORDER_RADIUS } from '@/constants'
import { getThemeColors, initTheme } from './utils'

export const useThemeStore = defineStore('theme-store', () => {
  const theme = ref<Settings.Settings>(initTheme())

  const naiveTheme = computed(() => {
    return theme.value.darkMode ? darkTheme : undefined
  })

  const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => {
    const { primaryColor, otherColor } = theme.value
    const themeColors = getThemeColors({
      primary: primaryColor,
      ...otherColor
    })
    return {
      common: {
        fontWeightStrong: FONT_WEIGHT_STRONG,
        borderRadius: BORDER_RADIUS,
        ...themeColors
      }
    }
  })

  const setDarkMode = (darkMode: boolean) => {
    theme.value.darkMode = darkMode
  }

  const setFollowSystemTheme = (visible: boolean) => {
    theme.value.followSystemTheme = visible
  }

  const setSiderInverted = (isInverted: boolean) => {
    theme.value.sider.inverted = isInverted
  }

  const setHeaderInverted = (isInverted: boolean) => {
    theme.value.header.inverted = isInverted
  }

  const setFooterInverted = (inverted: boolean) => {
    theme.value.footer.inverted = inverted
  }

  const setLayoutMode = (mode: Settings.Settings['layout']['mode']) => {
    theme.value.layout.mode = mode
  }

  const setPrimaryColor = (primaryColor: string) => {
    theme.value.primaryColor = primaryColor
    if (!theme.value.isCustomizeInfoColor) {
      theme.value.otherColor.info = primaryColor
    }
  }

  const setScrollMode = (mode: Settings.Settings['scrollMode']) => {
    theme.value.scrollMode = mode
  }

  const setIsFixedHeaderAndTab = (isFixed: boolean) => {
    theme.value.fixedHeaderAndTab = isFixed
  }

  const setHorizontalMenuPosition = (position: Settings.Settings['menu']['horizontalPosition']) => {
    theme.value.menu.horizontalPosition = position
  }

  const setHeaderHeight = (height: number | null) => {
    if (height) {
      theme.value.header.height = height
    }
  }

  const setTabHeight = (height: number | null) => {
    if (height) {
      theme.value.tab.height = height
    }
  }

  const setTabIsCache = (isCache: boolean) => {
    theme.value.tab.isCache = isCache
  }

  const setSiderWidth = (width: number | null) => {
    if (width) {
      theme.value.sider.width = width
    }
  }

  const setMixSiderWidth = (width: number | null) => {
    if (width) {
      theme.value.sider.mixWidth = width
    }
  }

  const setFooterVisible = (isVisible: boolean) => {
    theme.value.footer.visible = isVisible
  }

  const setFooterIsFixed = (isFixed: boolean) => {
    theme.value.footer.fixed = isFixed
  }

  const setHeaderCrumbVisible = (visible: boolean) => {
    theme.value.header.crumb.visible = visible
  }

  const setHeaderCrumbIconVisible = (visible: boolean) => {
    theme.value.header.crumb.showIcon = visible
  }

  const setTabVisible = (visible: boolean) => {
    theme.value.tab.visible = visible
  }

  const setTabMode = (mode: Settings.Settings['tab']['mode']) => {
    theme.value.tab.mode = mode
  }

  const setPageIsAnimate = (animate: boolean) => {
    theme.value.page.animate = animate
  }

  const pageAnimateMode = computed(() => {
    const { page } = theme.value
    return page.animate ? page.animateMode : undefined
  })
  const setPageAnimateMode = (mode: Settings.Settings['page']['animateMode']) => {
    theme.value.page.animateMode = mode
  }

  const reset = () => {
    theme.value = initTheme()
    setDarkMode(theme.value.darkMode)
  }

  return {
    theme,
    naiveTheme,
    naiveThemeOverrides,
    setDarkMode,
    setFollowSystemTheme,
    setSiderInverted,
    setHeaderInverted,
    setFooterInverted,
    setLayoutMode,
    setPrimaryColor,
    setScrollMode,
    setIsFixedHeaderAndTab,
    setHorizontalMenuPosition,
    setHeaderHeight,
    setTabHeight,
    setTabIsCache,
    setSiderWidth,
    setMixSiderWidth,
    setFooterVisible,
    setFooterIsFixed,
    setHeaderCrumbVisible,
    setHeaderCrumbIconVisible,
    setTabVisible,
    setTabMode,
    setPageIsAnimate,
    pageAnimateMode,
    setPageAnimateMode,
    reset
  }
})
