import { subscribeTabStore } from './tab'
import { subscribeCacheStore } from './cache'

export const subscribeStore = () => {
  subscribeTabStore()
  subscribeCacheStore()
}
