import { ref, type Ref } from 'vue'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { transformRoutes } from '@/utils'
import { router, constantRoutes } from '@/router'
import { useAuthStore } from '../auth'
import { useMenuStore } from '../menu'
import { fetchUserRoutes } from './service'

export const useRouteStore = defineStore('route-store', () => {
  const authStore = useAuthStore()
  const menuStore = useMenuStore()

  const isInitRoutes = ref(false)
  const rootRoute = ref<RouteRecordNormalized>()

  const setRootRoute = () => {
    const routes = router.getRoutes()
    let route = routes.find((route) => route.name === 'Root')
    while (route?.redirect) {
      route = routes.find(({ path }) => path === route?.redirect)
    }
    rootRoute.value = route
  }

  const setRoutes = (routes: RouteRecordRaw[]) => {
    for (const route of routes) {
      router.addRoute(route)
    }
    setRootRoute()
  }

  const initConstantRoutes = () => {
    setRoutes(transformRoutes(constantRoutes))
  }

  const clearRoutes = () => {
    const routes = router.getRoutes()
    for (const route of routes) {
      router.removeRoute(route.name!)
    }
  }

  const reset = () => {
    isInitRoutes.value = false
    clearRoutes()
    initConstantRoutes()
    menuStore.reset()
  }

  const initRoutes = async () => {
    const userInfo = authStore.userInfo

    const data = await fetchUserRoutes(userInfo?.userId ?? '')

    if (!data || !data.length) {
      const NO_MENU_MSG = '用户没有菜单权限~'
      window.$message.error(NO_MENU_MSG)
      return Promise.reject(new Error(NO_MENU_MSG))
    }

    clearRoutes()
    setRoutes(transformRoutes([...constantRoutes, ...(data ?? [])]))
    menuStore.setMenus(data ?? [])

    isInitRoutes.value = true
  }

  return {
    isInitRoutes,
    rootRoute: rootRoute as Ref<RouteRecordNormalized>,
    reset,
    initRoutes
  }
})
