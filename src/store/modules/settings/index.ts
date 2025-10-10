import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { usePreferredColorScheme } from '@vueuse/core'
import { defaultSettings } from '@/settings'
import { localStg } from '@/utils'

export const useSettingsStore = defineStore('settings-store', () => {
  const osTheme = usePreferredColorScheme()

  const settings = ref(localStg.get('settings') ?? defaultSettings)

  const theme = computed(() =>
    settings.value.theme === 'os' ? osTheme.value! : settings.value.theme
  )

  const setTheme = (_theme: Settings.Theme) => {
    localStg.set('settings', { ...settings.value, theme: _theme })
    settings.value.theme = _theme
  }

  return { settings, theme, setTheme }
})
