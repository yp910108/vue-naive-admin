import { useEventListener } from '@vueuse/core'
import { localStg } from '@/utils'
import { useTabStore } from '../modules'

export default function subscribeTabStore() {
  const tabStore = useTabStore()

  useEventListener(window, 'beforeunload', () => {
    localStg.set('tabs', tabStore.tabs)
  })
}
