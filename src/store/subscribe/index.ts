import subscribeAppStore from './app'
import subscribeThemeStore from './theme'

export function subscribeStore() {
  subscribeAppStore()
  subscribeThemeStore()
}
