import { cloneDeep } from 'lodash-es'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { usePreferredColorScheme } from '@vueuse/core'
import { defaultSettings } from '@/settings'
import { localStg } from '@/utils'

export const useSettingsStore = defineStore('settings-store', () => {
  const osTheme = usePreferredColorScheme()

  const settings = ref(localStg.get('settings') ?? cloneDeep(defaultSettings))

  const theme = computed(() =>
    settings.value.theme === 'os' ? osTheme.value! : settings.value.theme
  )

  const setTheme = (_theme: Settings.Theme) => {
    settings.value.theme = _theme
  }

  const setPrimaryColor = (primaryColor: string) => {
    settings.value.primaryColor = primaryColor
  }

  const setSiderWidth = (siderWidth: number | null) => {
    if (siderWidth) {
      settings.value.sider.width = siderWidth
    }
  }

  const setSiderCollapsedWidth = (siderCollapsedWidth: number | null) => {
    if (siderCollapsedWidth) {
      settings.value.sider.collapsedWidth = siderCollapsedWidth
    }
  }

  const setSiderLogoHeight = (siderLogoHeight: number | null) => {
    if (siderLogoHeight) {
      settings.value.sider.logoHeight = siderLogoHeight
    }
  }

  const setHeaderHeight = (headerHeight: number | null) => {
    if (headerHeight) {
      settings.value.header.height = headerHeight
    }
  }

  const setTabVisible = (tabVisible: boolean) => {
    settings.value.tab.visible = tabVisible
  }

  const setTabIsCache = (tabIsCache: boolean) => {
    settings.value.tab.isCache = tabIsCache
  }

  const setTabHeight = (tabHeight: number | null) => {
    if (tabHeight) {
      settings.value.tab.height = tabHeight
    }
  }

  return {
    settings,
    theme,
    setTheme,
    setPrimaryColor,
    setSiderWidth,
    setSiderCollapsedWidth,
    setSiderLogoHeight,
    setHeaderHeight,
    setTabVisible,
    setTabIsCache,
    setTabHeight
  }
})
