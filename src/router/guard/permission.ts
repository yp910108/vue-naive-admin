import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { localStg } from '@/utils'
import { useAuthStore, useRouteStore } from '@/store'

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const isLogin = localStg.get('token')
  const authStore = useAuthStore()
  const routeStore = useRouteStore()
  if (isLogin) {
    if (to.path === '/login') {
      next({ name: 'Root' })
    } else {
      if (!authStore.userInfo) {
        try {
          await authStore.getUserInfo()
          await routeStore.initAuthRoute()
          const { path, query, hash } = to
          next({ path, query, hash, replace: true })
        } catch (e) {
          authStore.reset()
          routeStore.reset()
          const redirect = to.fullPath
          next({ name: 'Login', query: { redirect } })
        }
      } else {
        next()
      }
    }
  } else {
    if (to.meta.white) {
      next()
    } else {
      const redirect = to.fullPath
      next({ name: 'Login', query: { redirect } })
    }
  }
}
