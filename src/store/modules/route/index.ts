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

  const resetRoutes = () => {
    const routes = router.getRoutes()
    for (const route of routes) {
      router.removeRoute(route.name!)
    }
  }

  const reset = () => {
    resetRoutes()
    cachedRoutes.value = []
  }

  const setRoutes = (routes: RouteRecordRaw[]) => {
    for (const route of routes) {
      router.addRoute(route)
    }
  }

  const initConstantRoutes = () => {
    setRoutes(transformAuthRoutesToVueRoutes(constantRoutes))
  }

  const initStaticRoutes = () => {
    resetRoutes()
    setRoutes(transformAuthRoutesToVueRoutes([...constantRoutes, ...staticRoutes]))
  }

  const initDynamicRoutes = async () => {
    const userInfo = authStore.userInfo

    const data = await fetchUserRoutes(userInfo!.userId)

    resetRoutes()
    setRoutes(transformAuthRoutesToVueRoutes([...constantRoutes, ...(data ?? [])]))
  }

  const initAuthRoutes = async () => {
    if (authRouteMode.value === 'static') {
      initStaticRoutes()
    } else {
      await initDynamicRoutes()
    }
  }

  return {
    cachedRoutes,
    reset,
    initConstantRoutes,
    initAuthRoutes
  }
})
