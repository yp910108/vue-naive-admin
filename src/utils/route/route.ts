import type { RouteComponent, RouteRecordRaw } from 'vue-router'
import type { Route } from '@/router/typing'
import { BasicLayout, BlankLayout } from '@/layouts'
import views, { NotFound } from '@/views'
import { combineURL, isExternal } from '../common'
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
 * 获取第一个不为外部链接的 path
 * @param routeData
 */
function getFirstPathNotExternal(routeData: Route[]) {
  for (const { path } of routeData) {
    if (!isExternal(path)) {
      return path
    }
  }
}

/**
 * 转换路由
 * @param routeData
 */
export function transformRoutes(routeData: Route[]) {
  const rootRoute = {
    name: 'Root',
    path: '/'
  } as RouteRecordRaw
  const blankLayoutRoute: RouteRecordRaw = {
    path: '/',
    name: 'BlankLayout',
    component: BlankLayout,
    children: []
  }
  const basicLayoutRoute: RouteRecordRaw = {
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

  const routes: RouteRecordRaw[] = [rootRoute, blankLayoutRoute, basicLayoutRoute, vueNotFoundRoute]

  const transform = (routeData: Route[], prefix: string = '') => {
    for (const { path, layout, redirect, props, children, ...rest } of routeData) {
      if (isExternal(path)) continue
      const fullpath = combineURL(prefix, path)
      const pagePath = removeParamsFromPath(fullpath)
      const name = parsePathToName(fullpath)
      if (children && children.length) {
        const firstPathNotExternal = getFirstPathNotExternal(children)
        if (!firstPathNotExternal) continue
        const route: RouteRecordRaw = {
          path: fullpath,
          name,
          redirect: redirect ?? `/${combineURL(fullpath, firstPathNotExternal)}`
        }
        if (layout === 'blank') {
          blankLayoutRoute.children.push(route)
        } else {
          basicLayoutRoute.children.push(route)
        }
        transform(children, fullpath)
      } else {
        const view = (views[`./${pagePath}/index.vue`] ?? NotFound) as Lazy<ModuleComponent>
        const component = getNamedView(view, name)
        const route: RouteRecordRaw = {
          path: fullpath,
          name,
          props,
          component,
          meta: { ...rest }
        }
        if (route.meta?.activeMenu) {
          route.meta.activeMenu = parsePathToName(route.meta.activeMenu)
        }
        if (layout === 'blank') {
          blankLayoutRoute.children.push(route)
        } else {
          basicLayoutRoute.children.push(route)
        }
      }
    }
  }

  transform(routeData)

  const visibleRoutes = basicLayoutRoute.children.filter(({ meta }) => !meta?.hide)

  const redirectPath = visibleRoutes.length
    ? `/${removeParamsFromPath(visibleRoutes[0].path)}`
    : undefined

  rootRoute.redirect = redirectPath

  return routes
}
