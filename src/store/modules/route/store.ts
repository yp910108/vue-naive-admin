import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { NO_MENU_MSG, transformRoutes } from '@/utils'
import { router, constantRoutes } from '@/router'
import { fetchUserRoutes } from './service'
import { useAuthStore } from '../auth'
import { useMenuStore } from '../menu'

export const useRouteStore = defineStore('route-store', () => {
  const authStore = useAuthStore()
  const menuStore = useMenuStore()

  const isInitAuthRoutes = ref(false)
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
    isInitAuthRoutes.value = false
    clearRoutes()
    initConstantRoutes()
    menuStore.reset()
  }

  const initDynamicRoutes = async () => {
    const userInfo = authStore.userInfo

    const data = await fetchUserRoutes(userInfo?.userId ?? '')

    if (!data || !data.length) {
      window.$message?.error(NO_MENU_MSG)
      return Promise.reject(new Error(NO_MENU_MSG))
    }

    clearRoutes()
    setRoutes(transformRoutes([...constantRoutes, ...(data ?? [])]))
    menuStore.setMenus(data ?? [])
  }

  const initAuthRoutes = async () => {
    await initDynamicRoutes()
    isInitAuthRoutes.value = true
  }

  return {
    isInitAuthRoutes,
    rootRoute: rootRoute as Ref<RouteRecordNormalized>,
    reset,
    initAuthRoutes
  }
})
