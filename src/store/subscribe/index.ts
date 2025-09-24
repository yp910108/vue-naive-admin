import subscribeAppStore from './app'
import subscribeThemeStore from './theme'
import subscribeTabStore from './tab'

export const subscribeStore = () => {
  subscribeAppStore()
  subscribeThemeStore()
  subscribeTabStore()
}
