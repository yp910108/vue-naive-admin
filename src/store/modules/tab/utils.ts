import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'

const hasFullPath = (
  route: RouteLocationNormalizedLoaded | RouteRecordNormalized
): route is RouteLocationNormalizedLoaded => {
  return !!(route as RouteLocationNormalizedLoaded).fullPath
}

export const getTabByRoute = (route: RouteLocationNormalizedLoaded | RouteRecordNormalized) => {
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
  } as Tab.MultiTab
}

export const hasTab = (tabs: Tab.MultiTab[], tab: Tab.MultiTab) => {
  return !!tabs.find(({ key }) => key === tab.key)
}
