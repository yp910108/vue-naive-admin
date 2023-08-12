import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { $t } from '@/locales'
import { createPermissionGuard } from './permission'

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    window.$loadingBar?.start()
    await createPermissionGuard(to, from, next)
  })
  router.afterEach((to) => {
    useTitle(to.meta.i18nTitle ? $t(to.meta.i18nTitle) : to.meta.title)
    window.$loadingBar?.finish()
  })
}
