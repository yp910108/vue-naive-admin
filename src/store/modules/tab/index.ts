import { ref } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { defineStore } from 'pinia'
import { useRouterPush } from '@/composables'
import {
  clearTabStorage,
  getTabRouteByVueRoute,
  getIndexInTabRoutes,
  getTabRoutes,
  getIndexInTabRoutesByRouteName,
  isInTabRoutes
} from './helpers'
import { computed } from 'vue'
import { useThemeStore } from '../theme'

export const useTabStore = defineStore('tab-store', () => {
  const { routerPush } = useRouterPush()

  const tabs = ref<App.GlobalTabRoute[]>([])
  const homeTab = ref<App.GlobalTabRoute>({
    name: 'root',
    fullPath: '/',
    meta: {
      title: 'Root'
    },
    scrollPosition: {
      left: 0,
      top: 0
    }
  })

  const activeTab = ref('')

  const activeTabIndex = computed(() => {
    return tabs.value.findIndex((tab) => tab.fullPath === activeTab.value)
  })

  const reset = () => {
    tabs.value = []
    homeTab.value = {
      name: 'root',
      fullPath: '/',
      meta: {
        title: 'Root'
      },
      scrollPosition: {
        left: 0,
        top: 0
      }
    }
    activeTab.value = ''
  }

  const resetTabStore = () => {
    clearTabStorage()
    reset()
  }

  const initHomeTab = (routeHomeName: string, router: Router) => {
    const routes = router.getRoutes()
    const findHome = routes.find((item) => item.name === routeHomeName)
    if (findHome && !findHome.children.length) {
      homeTab.value = getTabRouteByVueRoute(findHome)
    }
  }

  const setActiveTab = (fullPath: string) => {
    activeTab.value = fullPath
  }

  const removeTab = async (fullPath: string) => {
    const isActive = activeTab.value === fullPath
    const updateTabs = tabs.value.filter((tab) => tab.fullPath !== fullPath)
    if (!isActive) {
      tabs.value = updateTabs
    }
    if (isActive && updateTabs.length) {
      const activePath = updateTabs[updateTabs.length - 1].fullPath
      const navigationFailure = await routerPush(activePath)
      if (!navigationFailure) {
        tabs.value = updateTabs
        setActiveTab(activePath)
      }
    }
  }

  const clearTab = async (excludes: string[] = []) => {
    const { routerPush } = useRouterPush(false)

    const homePath = homeTab.value.fullPath
    const remain = [homePath, ...excludes]
    const hasActive = remain.includes(activeTab.value)
    const updateTabs = tabs.value.filter((tab) => remain.includes(tab.fullPath))
    if (hasActive) tabs.value = updateTabs
    if (!hasActive && updateTabs.length) {
      const activePath = updateTabs[updateTabs.length - 1].fullPath
      const navigationFailure = await routerPush(activePath)
      if (!navigationFailure) {
        tabs.value = updateTabs
        setActiveTab(activePath)
      }
    }
  }

  const clearLeftTab = (fullPath: string) => {
    const index = getIndexInTabRoutes(tabs.value, fullPath)
    if (index > -1) {
      const excludes = tabs.value.slice(index).map((item) => item.fullPath)
      clearTab(excludes)
    }
  }

  const clearRightTab = (fullPath: string) => {
    const index = getIndexInTabRoutes(tabs.value, fullPath)
    if (index > -1) {
      const excludes = tabs.value.slice(0, index + 1).map((item) => item.fullPath)
      clearTab(excludes)
    }
  }

  const clearAllTab = () => {
    clearTab()
  }

  const handleClickTab = async (fullPath: string) => {
    const { routerPush } = useRouterPush(false)

    const isActive = activeTab.value === fullPath
    if (!isActive) {
      const navigationFailure = await routerPush(fullPath)
      if (!navigationFailure) setActiveTab(fullPath)
    }
  }

  const iniTabStore = (currentRoute: RouteLocationNormalizedLoaded) => {
    const { theme } = useThemeStore()

    const _tabs: App.GlobalTabRoute[] = theme.tab.isCache ? getTabRoutes() : []

    const hasHome = getIndexInTabRoutesByRouteName(_tabs, homeTab.value.name as string) > -1
    if (!hasHome && homeTab.value.name !== 'root') {
      _tabs.unshift(homeTab.value)
    }

    const isHome = currentRoute.fullPath === homeTab.value.fullPath
    const index = getIndexInTabRoutesByRouteName(_tabs, currentRoute.name as string)
    if (!isHome) {
      const currentTab = getTabRouteByVueRoute(currentRoute)
      if (!currentRoute.meta.multiTab) {
        if (index > -1) {
          _tabs.splice(index, 1, currentTab)
        } else {
          _tabs.push(currentTab)
        }
      } else {
        const hasCurrent = isInTabRoutes(_tabs, currentRoute.fullPath)
        if (!hasCurrent) {
          _tabs.push(currentTab)
        }
      }
    }

    tabs.value = _tabs
    setActiveTab(currentRoute.fullPath)
  }

  const addTab = (route: RouteLocationNormalizedLoaded) => {
    const tab = getTabRouteByVueRoute(route)

    if (isInTabRoutes(tabs.value, tab.fullPath)) {
      return
    }

    const index = getIndexInTabRoutesByRouteName(tabs.value, route.name as string)

    if (index === -1) {
      tabs.value.push(tab)
      return
    }

    const { multiTab = false } = route.meta
    if (!multiTab) {
      tabs.value.splice(index, 1, tab)
      return
    }

    tabs.value.push(tab)
  }

  const setActiveTabTitle = (title: string) => {
    const item = tabs.value.find((tab) => tab.fullPath === activeTab.value)
    if (item) {
      if (item.meta.i18nTitle) {
        item.meta.i18nTitle = title as I18nType.I18nKey
      } else {
        item.meta.title = title
      }
    }
  }

  return {
    tabs,
    homeTab,
    activeTab,
    activeTabIndex,
    resetTabStore,
    initHomeTab,
    removeTab,
    clearTab,
    clearLeftTab,
    clearRightTab,
    clearAllTab,
    handleClickTab,
    iniTabStore,
    addTab,
    setActiveTab,
    setActiveTabTitle
  }
})
