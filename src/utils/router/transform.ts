import type { RouteComponent, RouteRecordRaw } from 'vue-router'
import { BasicLayout, BlankLayout } from '@/layouts'
import views from '@/views'
import { camelize, combineURL, isFunction } from '../common'

type Lazy<T> = () => Promise<T>

type ModuleComponent = {
  default: RouteComponent
}

/**
 * /login/:module => /login
 * @param path
 */
function removeParamsFromPath(path: string) {
  return path.split('/:')[0]
}

/**
 * 通过路径获取组件名称
 * @param path
 */
function parsePathToName(path: string) {
  return camelize(removeParamsFromPath(path).replace(/\//g, '-'), true)
}

/**
 * 判断是否是异步组件
 * @param component
 */
function isAsyncComponent(
  component: RouteComponent | Lazy<ModuleComponent>
): component is Lazy<ModuleComponent> {
  return isFunction(component)
}

/**
 * 给页面组件设置名称
 * @param component
 * @param name
 */
function setViewComponentName(component: RouteComponent | Lazy<ModuleComponent>, name: string) {
  if (isAsyncComponent(component)) {
    return async () => {
      const result = await component()
      Object.assign(result.default, { name })
      return result
    }
  }
}

/**
 * 将权限路由转换为 vue 路由
 * @param authRoutes
 * @returns vueRoutes
 */
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
  const vueNotFoundRoute = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*'
  } as RouteRecordRaw

  const vueRoutes: RouteRecordRaw[] = [
    vueRootRoute,
    vueBlankLayoutRoute,
    vueBasicLayoutRoute,
    vueNotFoundRoute
  ]

  const transform = (authRoutes: AuthRoute.Route[], prefix: string = '') => {
    for (const authRoute of authRoutes) {
      const { path, layout, children, ...rest } = authRoute
      const fullpath = combineURL(prefix, path ?? '')
      const pagePath = removeParamsFromPath(fullpath)
      const name = parsePathToName(fullpath)
      if (children && children.length) {
        transform(children, fullpath)
      } else {
        const component = views[`./${pagePath}/index.vue`]
        setViewComponentName(component, name)
        const vueRoute = {
          path: fullpath,
          name,
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

  const routes = vueBasicLayoutRoute.children.length
    ? vueBasicLayoutRoute.children
    : vueBlankLayoutRoute.children

  const redirectPath = routes.length ? `/${removeParamsFromPath(routes[0].path)}` : undefined

  vueRootRoute.redirect = redirectPath
  vueNotFoundRoute.redirect = redirectPath

  return vueRoutes
}
