import type { RouteLocationNormalizedLoaded, RouteRecord } from 'vue-router'

function hasFullPath(
  route: RouteLocationNormalizedLoaded | RouteRecord
): route is RouteLocationNormalizedLoaded {
  return !!(route as RouteLocationNormalizedLoaded).fullPath
}

export const generateTabByRoute = (
  route: RouteLocationNormalizedLoaded | RouteRecord,
  backRoutePath?: string
) => {
  const { name, meta } = route
  return {
    key: name as string,
    routePath: hasFullPath(route) ? route.fullPath : route.path,
    backRoutePath,
    title: meta.title,
    icon: meta.icon,
    scrollPosition: {
      left: 0,
      top: 0
    }
  } as Tab.TabItem
}

export const getTab = (tabs: Tab.TabItem[], key: string) => {
  return tabs.find((tab) => tab.key === key)
}

export const hasTab = (tabs: Tab.TabItem[], tab: Tab.TabItem) => {
  const _tab = getTab(tabs, tab.key)
  // update routePath when tab exists
  if (_tab && _tab.routePath !== tab.routePath) {
    _tab.routePath = tab.routePath
  }
  return !!_tab
}
