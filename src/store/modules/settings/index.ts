import { ref } from 'vue'
import { defineStore } from 'pinia'
import { defaultSettings } from '@/settings'
import { localStg } from '@/utils'

export const useSettingsStore = defineStore('settings-store', () => {
  const settings = ref(localStg.get('settings') ?? defaultSettings)

  const theme = ref<Exclude<Settings.Theme, 'os'>>(settings.value.theme as any)

  const setThemeByOs = (newTheme: Exclude<Settings.Theme, 'os'>) => {
    theme.value = newTheme
  }

  return { settings, theme, setThemeByOs }
})
