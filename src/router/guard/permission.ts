import type { RouteLocationNormalized } from 'vue-router'
import { INVALID_CODE, localStg, type RequestError } from '@/utils'
import { useAuthStore } from '@/store'

export const createPermissionGuard = async (to: RouteLocationNormalized) => {
  const { token: queryToken } = to.query
  if (queryToken) {
    localStg.set('token', queryToken as string)
  }
  const token = localStg.get('token')
  const authStore = useAuthStore()
  if (token) {
    if (to.name === 'Login') {
      return { name: 'Root' }
    } else {
      if (!authStore.isInit) {
        try {
          await authStore.init()
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
