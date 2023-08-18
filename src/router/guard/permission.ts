import type { RouteLocationNormalized } from 'vue-router'
import { localStg } from '@/utils'
import { useAuthStore, useRouteStore } from '@/store'

export async function createPermissionGuard(to: RouteLocationNormalized) {
  const isLogin = localStg.get('token')
  const authStore = useAuthStore()
  const routeStore = useRouteStore()
  if (isLogin) {
    if (to.name === 'Login') {
      return { name: 'Root' }
    } else {
      if (!routeStore.isInitAuthRoutes) {
        try {
          await routeStore.initAuthRoutes()
          const { path, query, hash } = to
          return { path, query, hash, replace: true }
        } catch (e) {
          console.warn(e)
          authStore.reset()
          const redirect = to.fullPath
          return { name: 'Login', query: { redirect } }
        }
      } else {
        return true
      }
    }
  } else {
    if (to.meta.white) {
      return true
    } else {
      const redirect = to.fullPath
      return { name: 'Login', query: { redirect } }
    }
  }
}
