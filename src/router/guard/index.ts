import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { createPermissionGuard } from './permission'

export const createRouterGuard = (router: Router) => {
  router.beforeEach(async (to) => {
    window.$loadingBar.start()
    return await createPermissionGuard(to)
  })
  router.afterEach((to) => {
    const title = to.meta.title
      ? `${to.meta.title} - ${import.meta.env.VITE_APP_NAME}`
      : import.meta.env.VITE_APP_NAME
    useTitle(title)
    window.$loadingBar.finish()
  })
}
