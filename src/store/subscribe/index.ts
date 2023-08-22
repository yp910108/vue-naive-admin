import subscribeAppStore from './app'
import subscribeThemeStore from './theme'
import subscribeTabStore from './tab'

export function subscribeStore() {
  subscribeAppStore()
  subscribeThemeStore()
  subscribeTabStore()
}
