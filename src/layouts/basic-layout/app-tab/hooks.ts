import { changeColor } from 'seemly'
import { computed, nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate } from 'vue-router'
import { useThemeVars } from 'naive-ui'
import { APP_CONTENT_TRANSITION_DURATION } from '@/constants'
import { useSettingsStore, useTabStore } from '@/store'
import type { ScrollPane } from '@/components'

export const useCssVars = () => {
  const themeVars = useThemeVars()

  const { settings, theme } = storeToRefs(useSettingsStore())

  const cssVars = computed(() => ({
    '--tab-height': `${settings.value.tab.height}px`,
    '--border-radius': '6px',
    '--bg-color-hover': themeVars.value.buttonColor2Hover,
    '--bg-color-active': changeColor(themeVars.value.primaryColor, { alpha: 0.1 }),
    '--text-color-hover': themeVars.value.primaryColor,
    '--text-color-active': themeVars.value.primaryColor,
    '--close-bg-color-hover':
      theme.value == 'dark' ? themeVars.value.borderColor : themeVars.value.iconColor,
    '--close-bg-color-active': themeVars.value.primaryColor,
    '--close-text-color-hover': '#fff',
    '--close-text-color-active': '#fff'
  }))

  return { cssVars }
}

export const useScroll = () => {
  const scrollRef = ref<InstanceType<typeof ScrollPane>>()

  const tabRefs: HTMLLIElement[] = []

  const setTabRefs = (index: number, el: any) => {
    tabRefs[index] = el
  }

  const tabStore = useTabStore()

  watch(
    () => tabStore.activeTab,
    (newVal) => {
      nextTick(() => {
        const activeTabIndex = tabStore.tabs.findIndex(({ key }) => key === newVal?.key)
        if (tabRefs.length) {
          const activeEl = tabRefs[activeTabIndex]
          const activeWidth = activeEl.offsetWidth
          const activeLeft = activeEl.offsetLeft + activeWidth
          const wrapperWidth = scrollRef.value?.scrollEl?.offsetWidth!
          const deltX = activeLeft - wrapperWidth + (wrapperWidth - activeWidth) / 2
          scrollRef.value?.scrollTo(deltX)
        }
      })
    }
  )

  return { scrollRef, setTabRefs }
}

export const useCache = () => {
  const tabStore = useTabStore()

  onBeforeRouteUpdate(async (to, from) => {
    const toName = to.name as string
    const fromName = from.name as string
    if (toName.includes(fromName)) {
      const backRoutePath = from.fullPath
      const newTab = tabStore.addTab(to, backRoutePath)
      tabStore.setActiveTab(newTab)
      const oldTab = tabStore.tabs.find(({ key }) => key === from.name)
      if (oldTab) {
        oldTab.cache = true
      }
    }
    const newTab = tabStore.addTab(to)
    tabStore.setActiveTab(newTab)
    if (newTab?.cache) {
      if (fromName.includes(toName)) {
        setTimeout(() => {
          newTab.cache = false
        }, APP_CONTENT_TRANSITION_DURATION + 500)
      } else {
        newTab.cache = false
        await new Promise((resolve) => {
          setTimeout(resolve, 20)
        })
      }
    }
  })
}
