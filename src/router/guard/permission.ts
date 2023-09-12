import type { RouteLocationNormalized } from 'vue-router'
import { INVALID_CODE, localStg, type RequestError } from '@/utils'
import { useAuthStore, useRouteStore } from '@/store'

export async function createPermissionGuard(to: RouteLocationNormalized) {
  const token = localStg.get('token')
  const authStore = useAuthStore()
  const routeStore = useRouteStore()
  if (token) {
    if (to.name === 'Login') {
      return { name: 'Root' }
    } else {
      if (!routeStore.isInitRoutes) {
        try {
          await routeStore.initRoutes()
          const { path, query, hash } = to
          return { path, query, hash, replace: true }
        } catch (e) {
          if ([...INVALID_CODE, 401].includes((e as RequestError).code)) {
            return true
          }
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
