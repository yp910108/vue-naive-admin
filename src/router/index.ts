import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { transformAuthRoutesToVueRoutes } from '@/utils'
import constantRoutes from './routes'
import { createRouterGuard } from './guard'

const { VITE_HASH_ROUTE = 'N', VITE_BASE_URL } = import.meta.env

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'Y' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  routes: transformAuthRoutesToVueRoutes(constantRoutes)
})

export function setupRouter(app: App) {
  app.use(router)
  createRouterGuard(router)
}

export { constantRoutes }
export { default as staticRoutes } from './modules'
