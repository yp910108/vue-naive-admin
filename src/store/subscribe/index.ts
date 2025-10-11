import { subscribeSettingsStore } from './settings'
import { subscribeTabStore } from './tab'
import { subscribeCacheStore } from './cache'

export const subscribeStore = () => {
  subscribeSettingsStore()
  subscribeTabStore()
  subscribeCacheStore()
}
