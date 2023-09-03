import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { createPermissionGuard } from './permission'

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    window.$loadingBar.start()
    return await createPermissionGuard(to)
  })
  router.afterEach((to) => {
    useTitle(`${to.meta.title} - ${import.meta.env.VITE_APP_NAME}`)
    window.$loadingBar.finish()
  })
}
