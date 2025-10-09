import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, type RouteRecord, type RouteRecordRaw } from 'vue-router'
import { localStg, transformRoutes } from '@/utils'
import { constantRouteData } from '@/router'
import { useAuthStore } from '../auth'
import { useMenuStore } from '../menu'
import { fetchAuthRoutes } from './service'

export const useRouteStore = defineStore('route-store', () => {
  const router = useRouter()

  const authStore = useAuthStore()

  const menuStore = useMenuStore()

  const rootRoute = ref<RouteRecord>()

  const setRootRoute = () => {
    const routes = router.getRoutes()
    let route = routes.find((route) => route.name === 'Root')
    while (route?.redirect) {
      route = routes.find(({ path }) => path === route?.redirect)
    }
    rootRoute.value = route
  }

  const localRouteData = ref<Route.RouteData[]>(localStg.get('localRouteData') ?? [])

  const addLocalRoute = (routeData: Route.RouteData) => {
    if (!localRouteData.value.find((item) => item.path === routeData.path)) {
      localRouteData.value.push({ ...routeData, unsafeRoot: true })
      localStg.set('localRouteData', localRouteData.value)
    }
    const routes = router.getRoutes()
    const basicLayoutRoute = routes.find((route) => route.name === 'BasicLayout')
    if (!basicLayoutRoute?.children.find((route) => route.path === routeData.path)) {
      const routes = transformRoutes([routeData])
      const route = routes.find((route) => route.name === 'BasicLayout')?.children?.[0]!
      router.addRoute('BasicLayout', route)
    }
  }

  const setRoutes = (routes: RouteRecordRaw[]) => {
    for (const route of routes) {
      router.addRoute(route)
    }
    setRootRoute()
  }

  const initConstantRoutes = () => {
    setRoutes(transformRoutes(constantRouteData))
  }

  const clearRoutes = () => {
    const routes = router.getRoutes()
    for (const route of routes) {
      router.removeRoute(route.name!)
    }
  }

  const init = async () => {
    const userInfo = authStore.userInfo
    const routeData = await fetchAuthRoutes(userInfo?.userId ?? '')
    if (!routeData?.length) {
      const NO_MENU_MSG = '用户没有菜单权限~'
      window.$message.error(NO_MENU_MSG)
      return Promise.reject(new Error(NO_MENU_MSG))
    }
    clearRoutes()
    setRoutes(transformRoutes([...constantRouteData, ...routeData, ...localRouteData.value]))
    menuStore.setMenus(routeData)
  }

  const reset = () => {
    clearRoutes()
    initConstantRoutes()
    localStg.remove('localRouteData')
    menuStore.reset()
  }

  return {
    rootRoute: rootRoute as Ref<RouteRecord>,
    localRouteData,
    addLocalRoute,
    init,
    reset
  }
})
