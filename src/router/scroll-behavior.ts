import type { RouterScrollBehavior } from 'vue-router'
import { useAppStore, useTabStore } from '@/store'

export const scrollBehavior: RouterScrollBehavior = (to, from) => {
  const appStore = useAppStore()

  const tabStore = useTabStore()

  const { left, top } = appStore.getScrollInfo()

  if (from.meta.keepAlive) {
    const fromTab = tabStore.tabs.find(({ key }) => key === from.name)
    if (fromTab) {
      tabStore.setScrollPosition(fromTab, { left, top })
    }
  }

  const toTab = tabStore.tabs.find(({ key }) => key === to.name)

  return new Promise((resolve) => {
    setTimeout(() => {
      if (toTab) {
        appStore.scrollTo(toTab.scrollPosition)
      }
      resolve(false)
    }, 400)
  })
}
