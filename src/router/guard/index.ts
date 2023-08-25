import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { createPermissionGuard } from './permission'

export default function createRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    window.$loadingBar?.start()
    return await createPermissionGuard(to)
  })
  router.afterEach((to) => {
    useTitle(to.meta.title)
    window.$loadingBar?.finish()
  })
}
