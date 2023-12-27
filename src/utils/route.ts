import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router'
import type { RouteData } from '@/store'
import { BasicLayout, BlankLayout } from '@/layouts'
import views, { NotFound } from '@/views'
import { camelize } from './camelize'
import { combineURL, isExternal } from './url'

/**
 * /login/:module => /login
 * @param path
 */
export function removeParamsFromPath(path: string) {
  return path.split('/:')[0]
}

/**
 * 通过路径获取组件名称
 * @param path
 */
export function parsePathToName(path: string) {
  path = removeParamsFromPath(path).replace(/\//g, '-')
  return camelize(path, true)
}

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
function getFirstPathNotExternal(routeData: RouteData[]) {
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
export function transformRoutes(routeData: RouteData[]) {
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

  const transform = (routeData: RouteData[], prefix: string = '', parentMeta?: RouteMeta) => {
    for (const { path, layout, redirect, children, ...rest } of routeData) {
      if (isExternal(path)) continue
      const routePath = combineURL(prefix, path)
      const pagePath = removeParamsFromPath(routePath)
      const name = parsePathToName(routePath)
      const meta = {
        ...rest,
        keepAlive: rest.keepAlive ?? parentMeta?.keepAlive,
        activeMenu: rest.activeMenu ?? parentMeta?.activeMenu,
        unsafeRoot: parentMeta?.unsafeRoot ?? rest.unsafeRoot
      }
      if (children && children.length) {
        const firstPathNotExternal = getFirstPathNotExternal(children)
        if (!firstPathNotExternal) continue
        const route: RouteRecordRaw = {
          path: routePath,
          name,
          redirect: redirect ?? `/${combineURL(routePath, firstPathNotExternal)}`,
          meta
        }
        if (layout === 'blank') {
          blankLayoutRoute.children.push(route)
        } else {
          basicLayoutRoute.children.push(route)
        }
        transform(children, routePath, meta)
      } else {
        const view = (views[`./${pagePath}/index.vue`] ?? NotFound) as Lazy<ModuleComponent>
        const component = getNamedView(view, name)
        const route: RouteRecordRaw = { path: routePath, name, component, meta }
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

  const safeRoutes = basicLayoutRoute.children.filter(({ meta }) => !meta?.unsafeRoot)

  const rootPath = safeRoutes.length ? `/${removeParamsFromPath(safeRoutes[0].path)}` : undefined

  rootRoute.redirect = rootPath

  return routes
}
