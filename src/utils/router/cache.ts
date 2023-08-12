import type { RouteRecordRaw } from 'vue-router'

/**
 * 获取缓存的路由对应组件的名称
 * @param routes
 * @returns
 */
export function getCachedRoutes(routes: RouteRecordRaw[]) {
  const cached: string[] = []
  for (const route of routes) {
    const { meta, children } = route
    if (children && children.length) {
      for (const _route of children) {
        if (meta?.keepAlive && _route.name) {
          cached.push(_route.name as string)
        }
      }
    }
  }
  return cached
}
