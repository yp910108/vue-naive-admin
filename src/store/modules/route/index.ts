import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router, constantRoutes, ROOT_ROUTE, routes as staticRoutes } from '@/router'
import {
  filterAuthRoutesByUserPermission,
  getConstantRouteNames,
  localStg,
  transformAuthRouteToMenu,
  transformAuthRouteToSearchMenus,
  transformAuthRouteToVueRoute,
  transformAuthRoutesToVueRoutes,
  transformRouteNameToRoutePath,
  transformRoutePathToRouteName
} from '@/utils'
import { useAuthStore } from '../auth'
import { useTabStore } from '../tab'
import { fetchUserRoutes } from '@/service/api'
import { sortRoutes } from '@/utils/router/module'
import { getCachedRoutes } from '@/utils/router/cache'

export const useRouteStore = defineStore('route-store', () => {
  const authRouteMode = ref(import.meta.env.VITE_AUTH_ROUTE_MODE)
  const isInitAuthRoute = ref(false)
  const routeHomeName = ref<AuthRoute.AllRouteKey>(
    transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH)
  )
  const menus = ref<App.GlobalMenuOption[]>([])
  const searchMenus = ref<AuthRoute.Route[]>([])
  const cachedRoutes = ref<string[]>([])

  const resetRoutes = () => {
    const routes = router.getRoutes()
    for (const route of routes) {
      const name = (route.name || 'root') as AuthRoute.AllRouteKey
      if (!isConstantRoute(name)) {
        router.removeRoute(name)
      }
    }
  }

  const reset = () => {
    resetRoutes()

    authRouteMode.value = import.meta.env.VITE_AUTH_ROUTE_MODE
    isInitAuthRoute.value = false
    routeHomeName.value = transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH)
    menus.value = []
    searchMenus.value = []
    cachedRoutes.value = []
  }

  const isConstantRoute = (name: AuthRoute.AllRouteKey) => {
    const constantRouteNames = getConstantRouteNames(constantRoutes)
    return constantRouteNames.includes(name)
  }

  const isValidConstantRoute = (name: AuthRoute.AllRouteKey) => {
    const NOT_FOUND_PAGE_NAME: AuthRoute.NotFoundRouteKey = 'not-found'
    const constantRouteNames = getConstantRouteNames(constantRoutes)
    return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME
  }

  const handleUpdateRootRedirect = (routeKey: AuthRoute.AllRouteKey) => {
    if (routeKey === 'root' || routeKey === 'not-found') {
      throw new Error('routeKey 的值不能为 root 或者 not-found')
    }
    const rootRoute: AuthRoute.Route = {
      ...ROOT_ROUTE,
      redirect: transformRouteNameToRoutePath(routeKey)
    }
    const rootRouteName: AuthRoute.AllRouteKey = 'root'
    router.removeRoute(rootRouteName)
    const rooteVueRoute = transformAuthRouteToVueRoute(rootRoute)[0]
    router.addRoute(rooteVueRoute)
  }

  const handleAuthRoute = (routes: AuthRoute.Route[]) => {
    ;(menus.value as App.GlobalMenuOption[]) = transformAuthRouteToMenu(routes)
    searchMenus.value = transformAuthRouteToSearchMenus(routes)

    const vueRoutes = transformAuthRoutesToVueRoutes(routes)

    for (const route of vueRoutes) {
      router.addRoute(route)
    }

    cachedRoutes.value = getCachedRoutes(vueRoutes)
  }

  const initDynamicRoute = async () => {
    const authStore = useAuthStore()
    const { initHomeTab } = useTabStore()

    const { userId } = localStg.get('userInfo') ?? {}

    if (!userId) {
      throw new Error('userId 不能为空！')
    }

    const { error, data } = await fetchUserRoutes(userId)

    if (!error) {
      routeHomeName.value = data.home
      handleUpdateRootRedirect(data.home)
      handleAuthRoute(sortRoutes(data.routes))

      initHomeTab(data.home, router)

      isInitAuthRoute.value = true
    } else {
      authStore.reset()
    }
  }

  const initStaticRoute = () => {
    const { initHomeTab } = useTabStore()
    const auth = useAuthStore()

    const routes = filterAuthRoutesByUserPermission(staticRoutes, auth.userInfo.userRole)
    handleAuthRoute(routes)

    initHomeTab(routeHomeName.value, router)

    isInitAuthRoute.value = true
  }

  const initAuthRoute = async () => {
    if (authRouteMode.value === 'dynamic') {
      await initDynamicRoute()
    } else {
      initStaticRoute()
    }
  }

  const addCachedRoute = (name: AuthRoute.AllRouteKey) => {
    const index = cachedRoutes.value.indexOf(name)
    if (index === -1) {
      cachedRoutes.value.push(name)
    }
  }

  const removeCachedRoute = (name: AuthRoute.AllRouteKey) => {
    const index = cachedRoutes.value.indexOf(name)
    if (index > -1) {
      cachedRoutes.value.splice(index, 1)
    }
  }

  return {
    menus,
    searchMenus,
    cachedRoutes,
    reset,
    isInitAuthRoute,
    isValidConstantRoute,
    initAuthRoute,
    addCachedRoute,
    removeCachedRoute
  }
})
