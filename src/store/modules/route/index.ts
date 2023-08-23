import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router, constantRoutes } from '@/router'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { transformAuthRoutesToVueRoutes } from '@/utils'
import { fetchUserRoutes } from '@/service'
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
    setRoutes(transformAuthRoutesToVueRoutes(constantRoutes))
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
      window.$message?.error('用户没有权限！')
      return Promise.reject(new Error('用户没有权限！'))
    }

    clearRoutes()
    setRoutes(transformAuthRoutesToVueRoutes([...constantRoutes, ...(data ?? [])]))
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
