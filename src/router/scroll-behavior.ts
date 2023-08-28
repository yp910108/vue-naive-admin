import type { RouterScrollBehavior } from 'vue-router'
import { useAppStore, useTabStore } from '@/store'

export const scrollBehavior: RouterScrollBehavior = (to, from) => {
  const appStore = useAppStore()
  const tabStore = useTabStore()

  const { scrollEl, scrollLeft, scrollTop } = appStore.getScrollInfo()

  if (from.meta.keepAlive) {
    const fromTab = tabStore.tabs.find(({ key }) => key === from.name)
    if (fromTab) {
      tabStore.setScrollPosition(fromTab, { left: scrollLeft, top: scrollTop })
    }
  }

  const toTab = tabStore.tabs.find(({ key }) => key === to.name)

  return new Promise((resolve) => {
    setTimeout(() => {
      if (toTab) {
        const scrollPosition = toTab.scrollPosition
        if (scrollEl) {
          scrollEl.scrollLeft = scrollPosition.left
          scrollEl.scrollTop = scrollPosition.top
        }
      }
      resolve(false)
    }, 400)
  })
}
