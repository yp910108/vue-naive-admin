import { watchEffect } from 'vue'
import { useOsTheme } from 'naive-ui'
import { useSettingsStore } from '../modules'

export const subscribeSettingsStore = () => {
  const settingsStore = useSettingsStore()

  const osTheme = useOsTheme()

  watchEffect(() => {
    if (settingsStore.settings.theme === 'os') {
      settingsStore.setThemeByOs(osTheme.value!)
    }
  })
}
