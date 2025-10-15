import { localStg } from '@/utils'
import { useSettingsStore, useTabStore } from '../modules'

export const subscribeTabStore = () => {
  const settingsStore = useSettingsStore()

  const tabStore = useTabStore()

  tabStore.$subscribe((_, { tabs }) => {
    if (settingsStore.settings.tab.isCache) {
      localStg.set('tabs', tabs)
    }
  })
}
