import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'
import type { MultiTab } from './typings'

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
    icon: meta.icon,
    scrollPosition: {
      left: 0,
      top: 0
    }
  } as MultiTab
}

export function hasTab(tabs: MultiTab[], tab: MultiTab) {
  return !!tabs.find(({ key }) => key === tab.key)
}
