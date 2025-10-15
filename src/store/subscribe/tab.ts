import { storeToRefs } from 'pinia'
import { localStg } from '@/utils'
import { useSettingsStore, useTabStore } from '../modules'

export const subscribeTabStore = () => {
  const { settings } = storeToRefs(useSettingsStore())

  const tabStore = useTabStore()

  tabStore.$subscribe((_, { tabs }) => {
    if (settings.value.tab.visible && settings.value.tab.isCache) {
      localStg.set('tabs', tabs)
    }
  })
}
