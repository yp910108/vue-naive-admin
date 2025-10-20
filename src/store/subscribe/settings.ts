import { localStg } from '@/utils'
import { useSettingsStore } from '../modules'

export const subscribeSettingsStore = () => {
  const settingsStore = useSettingsStore()

  settingsStore.$subscribe((_, { settings }) => {
    localStg.set('settings', settings)
  })
}
