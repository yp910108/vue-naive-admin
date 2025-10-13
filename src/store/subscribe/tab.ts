import { localStg } from '@/utils'
import { useTabStore } from '../modules'

export const subscribeTabStore = () => {
  const tabStore = useTabStore()

  tabStore.$subscribe((_, { tabs }) => {
    localStg.set('tabs', tabs)
  })
}
