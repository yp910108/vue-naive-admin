import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'

function hasFullPath(
  route: RouteLocationNormalizedLoaded | RouteRecordNormalized
): route is RouteLocationNormalizedLoaded {
  return !!(route as RouteLocationNormalizedLoaded).fullPath
}

export function getTabByRoute(route: RouteLocationNormalizedLoaded | RouteRecordNormalized) {
  const { name, meta } = route
  return {
    key: name as string,
    routePath: hasFullPath(route) ? route.fullPath : route.path,
    title: meta.title,
    icon: meta.icon
  }
}

export function hasTab(tabs: App.GlobalTab[], activeTab: App.GlobalTab) {
  return !!tabs.find((tab) => tab.key === activeTab.key)
}
