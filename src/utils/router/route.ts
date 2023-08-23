import type { RouteComponent, RouteRecordRaw } from 'vue-router'
import { BasicLayout, BlankLayout } from '@/layouts'
import views, { NotFound } from '@/views'
import { combineURL } from '../common'
import { parsePathToName, removeParamsFromPath } from './helper'

type Lazy<T> = () => Promise<T>

type ModuleComponent = {
  default: RouteComponent
}

/**
 * 给页面设置名称并返回
 * @param component
 * @param name
 */
function getNamedView(view: Lazy<ModuleComponent>, name: string) {
  return async () => {
    const result = await view()
    Object.assign(result.default, { name })
    return result
  }
}

/**
 * 将权限路由转换为 vue 路由
 * @param authRoutes
 * @returns vueRoutes
 */
// TODO activeMenu i18n href
export function transformAuthRoutesToVueRoutes(authRoutes: AuthRoute.Route[]) {
  const vueRootRoute = {
    name: 'Root',
    path: '/'
  } as RouteRecordRaw
  const vueBlankLayoutRoute: RouteRecordRaw = {
    path: '/',
    name: 'BlankLayout',
    component: BlankLayout,
    children: []
  }
  const vueBasicLayoutRoute: RouteRecordRaw = {
    path: '/',
    name: 'BasicLayout',
    component: BasicLayout,
    children: []
  }
  const vueNotFoundRoute: RouteRecordRaw = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: NotFound
  }

  const vueRoutes: RouteRecordRaw[] = [
    vueRootRoute,
    vueBlankLayoutRoute,
    vueBasicLayoutRoute,
    vueNotFoundRoute
  ]

  const transform = (authRoutes: AuthRoute.Route[], prefix: string = '') => {
    for (const authRoute of authRoutes) {
      const { path, layout, redirect, props, children, ...rest } = authRoute
      const fullpath = combineURL(prefix, path)
      const pagePath = removeParamsFromPath(fullpath)
      const name = parsePathToName(fullpath)
      if (children && children.length) {
        const firstChild = children[0]
        const vueRoute: RouteRecordRaw = {
          path: fullpath,
          name,
          redirect: redirect ?? `/${combineURL(fullpath, firstChild.path)}`
        }
        if (layout === 'blank') {
          vueBlankLayoutRoute.children.push(vueRoute)
        } else {
          vueBasicLayoutRoute.children.push(vueRoute)
        }
        transform(children, fullpath)
      } else {
        const view = (views[`./${pagePath}/index.vue`] ?? NotFound) as Lazy<ModuleComponent>
        const component = getNamedView(view, name)
        const vueRoute: RouteRecordRaw = {
          path: fullpath,
          name,
          props,
          component,
          meta: { ...rest }
        }
        if (layout === 'blank') {
          vueBlankLayoutRoute.children.push(vueRoute)
        } else {
          vueBasicLayoutRoute.children.push(vueRoute)
        }
      }
    }
  }

  transform(authRoutes)

  const routes = vueBasicLayoutRoute.children

  const redirectPath = routes.length ? `/${removeParamsFromPath(routes[0].path)}` : undefined

  vueRootRoute.redirect = redirectPath

  return vueRoutes
}
