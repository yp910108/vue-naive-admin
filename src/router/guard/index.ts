import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { createPermissionGuard } from './permission'

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    window.$loadingBar?.start()
    await createPermissionGuard(to, from, next)
  })
  router.afterEach((to) => {
    useTitle(to.meta.title)
    window.$loadingBar?.finish()
  })
}
