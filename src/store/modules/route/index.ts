import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router, constantRoutes, staticRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { localStg, transformAuthRoutesToVueRoutes } from '@/utils'
import { fetchUserRoutes } from '@/service'

export const useRouteStore = defineStore('route-store', () => {
  const authRouteMode = ref(import.meta.env.VITE_AUTH_ROUTE_MODE)
  const isInitAuthRoute = ref(false)
  const cachedRoutes = ref<string[]>([])

  const reset = () => {
    const routes = router.getRoutes()
    for (const route of routes) {
      router.removeRoute(route.name!)
    }

    isInitAuthRoute.value = false
    cachedRoutes.value = []
  }

  const setRoutes = (routes: RouteRecordRaw[]) => {
    reset()
    isInitAuthRoute.value = true
    for (const route of routes) {
      router.addRoute(route)
    }
  }

  const initStaticRoute = () => {
    setRoutes(transformAuthRoutesToVueRoutes([...constantRoutes, ...staticRoutes]))
  }

  const initDynamicRoute = async () => {
    const { userId } = localStg.get('userInfo') ?? {}

    if (!userId) {
      throw new Error('userId 不能为空!')
    }

    const { data } = await fetchUserRoutes(userId)

    setRoutes(transformAuthRoutesToVueRoutes(data ?? []))
  }

  const initAuthRoute = async () => {
    if (authRouteMode.value === 'static') {
      initStaticRoute()
    } else {
      await initDynamicRoute()
    }
  }

  return {
    isInitAuthRoute,
    cachedRoutes,
    reset,
    initAuthRoute
  }
})
