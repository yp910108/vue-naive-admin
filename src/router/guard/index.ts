import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { useOsTheme, darkTheme, createDiscreteApi } from 'naive-ui'
import { createPermissionGuard } from './permission'

export default function createRouterGuard(router: Router) {
  const osTheme = useOsTheme()
  const theme = osTheme.value === 'dark' ? darkTheme : undefined
  const { message } = createDiscreteApi(['message'], {
    configProviderProps: { theme }
  })
  router.beforeEach(async (to) => {
    message.success('测试提示信息1', { duration: 20000 })
    window.$message?.success('测试提示信息2', { duration: 20000 })
    window.$loadingBar?.start()
    return await createPermissionGuard(to)
  })
  router.afterEach((to) => {
    useTitle(to.meta.title)
    window.$loadingBar?.finish()
  })
}
