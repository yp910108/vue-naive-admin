import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from 'vue-router'
import { localStg } from '@/utils'
import { useSettingsStore } from '../settings'
import { useRouteStore } from '../route'
import { generateTabByRoute, getTab, hasTab } from './utils'

export const useTabStore = defineStore('tab-store', () => {
  const route = useRoute()

  const router = useRouter()

  const settingsStore = useSettingsStore()

  const routeStore = useRouteStore()

  const tabs = ref<Tab.TabItem[]>([])

  const pushLastTab = () => {
    const lastTab = tabs.value[tabs.value.length - 1]
    router.push(lastTab.routePath)
  }

  const addTab = (route: RouteLocationNormalizedLoaded, backRoutePath?: string) => {
    const tab = generateTabByRoute(route, backRoutePath)
    if (!hasTab(tabs.value, tab)) {
      tabs.value.push(tab)
      return tab
    } else {
      return getTab(tabs.value, route.name as string)!
    }
  }

  const removeTab = (tab: Tab.TabItem) => {
    const index = tabs.value.findIndex(({ key }) => key === tab.key)
    tabs.value.splice(index, 1)
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }

  const clearLeftTabs = (currentTab: Tab.TabItem) => {
    const currentIndex = tabs.value.findIndex(({ key }) => key === currentTab.key)
    const rootTab = generateTabByRoute(routeStore.rootRoute)
    const _tabs = tabs.value.slice(currentIndex)
    _tabs.unshift(rootTab)
    tabs.value = _tabs
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }

  const clearRightTabs = (currentTab: Tab.TabItem) => {
    const currentIndex = tabs.value.findIndex(({ key }) => key === currentTab.key)
    tabs.value = tabs.value.slice(0, currentIndex + 1)
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }

  const clearOtherTabs = (currentTab: Tab.TabItem) => {
    const rootTab = generateTabByRoute(routeStore.rootRoute)
    const restTabs = tabs.value.filter(({ key }) => currentTab.key === key)
    if (!hasTab(restTabs, rootTab)) {
      restTabs.unshift(rootTab)
    }
    tabs.value = restTabs
    if (!hasTab(tabs.value, activeTab.value!)) {
      pushLastTab()
    }
  }

  const clearAllTabs = () => {
    const rootTab = generateTabByRoute(routeStore.rootRoute)
    tabs.value = [rootTab]
    router.push(rootTab.routePath)
  }

  const activeTab = ref<Tab.TabItem>()

  const setActiveTab = (tab: Tab.TabItem) => {
    activeTab.value = tab
  }

  const setScrollPosition = (tab: Tab.TabItem, scrollPosition: Tab.TabItem['scrollPosition']) => {
    tab.scrollPosition = scrollPosition
  }

  const init = () => {
    const rootTab = generateTabByRoute(routeStore.rootRoute)
    const currentTab = generateTabByRoute(route)
    if (settingsStore.settings.tab.isCache) {
      const _tabs = localStg.get('tabs') ?? []
      if (!hasTab(_tabs, rootTab)) {
        _tabs.unshift(rootTab)
      }
      if (!hasTab(_tabs, currentTab)) {
        _tabs.push(currentTab)
      }
      setActiveTab(currentTab)
      tabs.value = _tabs
    } else {
      const _tabs = [rootTab]
      if (currentTab.key !== rootTab.key) {
        _tabs.push(currentTab)
        setActiveTab(currentTab)
      } else {
        setActiveTab(rootTab)
      }
      tabs.value = _tabs
    }
  }

  const reset = () => {
    localStg.remove('tabs')
    tabs.value = []
    activeTab.value = undefined
  }

  return {
    tabs,
    addTab,
    removeTab,
    clearLeftTabs,
    clearRightTabs,
    clearOtherTabs,
    clearAllTabs,
    activeTab,
    setActiveTab,
    setScrollPosition,
    init,
    reset
  }
})
