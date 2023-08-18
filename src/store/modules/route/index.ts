import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router, constantRoutes, staticRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { transformAuthRoutesToVueRoutes } from '@/utils'
import { fetchUserRoutes } from '@/service'
import { useAuthStore } from '../auth'
import { useMenuStore } from '../menu'

export const useRouteStore = defineStore('route-store', () => {
  const authStore = useAuthStore()
  const menuStore = useMenuStore()

  const authRouteMode = ref(import.meta.env.VITE_AUTH_ROUTE_MODE)
  const isInitAuthRoutes = ref(false)
  const cachedRoutes = ref<string[]>([])

  const setRoutes = (routes: RouteRecordRaw[]) => {
    for (const route of routes) {
      router.addRoute(route)
    }
  }

  const initConstantRoutes = () => {
    setRoutes(transformAuthRoutesToVueRoutes(constantRoutes))
  }

  const resetRoutes = () => {
    const routes = router.getRoutes()
    for (const route of routes) {
      router.removeRoute(route.name!)
    }
  }

  const reset = () => {
    isInitAuthRoutes.value = false
    cachedRoutes.value = []
    resetRoutes()
    initConstantRoutes()
    menuStore.reset()
  }

  const initStaticRoutes = () => {
    resetRoutes()
    setRoutes(transformAuthRoutesToVueRoutes([...constantRoutes, ...staticRoutes]))
    menuStore.setMenus(staticRoutes)
  }

  const initDynamicRoutes = async () => {
    const userInfo = authStore.userInfo

    const data = await fetchUserRoutes(userInfo?.userId ?? '')

    resetRoutes()
    setRoutes(transformAuthRoutesToVueRoutes([...constantRoutes, ...(data ?? [])]))
    menuStore.setMenus(data ?? [])
  }

  const initAuthRoutes = async () => {
    if (authRouteMode.value === 'static') {
      initStaticRoutes()
    } else {
      await initDynamicRoutes()
    }
    isInitAuthRoutes.value = true
  }

  return {
    isInitAuthRoutes,
    cachedRoutes,
    reset,
    initAuthRoutes
  }
})
