import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { transformRoutes } from '@/utils'
import { routeData } from './route-data'
import { createRouterGuard } from './guard'

const { VITE_HASH_ROUTE = 'N', VITE_BASE_URL } = import.meta.env

// TODO scrollBehavior
export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'Y' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  routes: transformRoutes(routeData)
})

export const setupRouter = async (app: App) => {
  app.use(router)
  createRouterGuard(router)
  await router.isReady()
}

export { routeData as constantRouteData }
