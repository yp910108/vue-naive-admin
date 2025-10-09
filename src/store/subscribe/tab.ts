import { watch } from 'vue'
import { localStg } from '@/utils'
import { useTabStore } from '../modules'

export const subscribeTabStore = () => {
  const tabStore = useTabStore()

  watch(tabStore.tabs, (newTabs) => {
    localStg.set('tabs', newTabs)
  })
}
