import { watch } from 'vue'
import { localStg } from '@/utils'
import { useSettingsStore } from '../modules'

export const subscribeSettingsStore = () => {
  const settingsStore = useSettingsStore()

  watch(settingsStore.settings, (newSettings) => {
    localStg.set('settings', newSettings)
  })
}
