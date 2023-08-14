import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router, constantRoutes, staticRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { transformAuthRoutesToVueRoutes } from '@/utils'
import { fetchUserRoutes } from '@/service'
import { useAuthStore } from '../auth'

export const useRouteStore = defineStore('route-store', () => {
  const authStore = useAuthStore()

  const authRouteMode = ref(import.meta.env.VITE_AUTH_ROUTE_MODE)
  const cachedRoutes = ref<string[]>([])

  const reset = () => {
    const routes = router.getRoutes()
    for (const route of routes) {
      router.removeRoute(route.name!)
    }

    cachedRoutes.value = []
  }

  const setRoutes = (routes: RouteRecordRaw[]) => {
    reset()
    for (const route of routes) {
      router.addRoute(route)
    }
  }

  const initStaticRoute = () => {
    setRoutes(transformAuthRoutesToVueRoutes([...constantRoutes, ...staticRoutes]))
  }

  const initDynamicRoute = async () => {
    const userInfo = authStore.userInfo

    const data = await fetchUserRoutes(userInfo!.userId)

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
    cachedRoutes,
    reset,
    initAuthRoute
  }
})
