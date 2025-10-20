import { defineComponent, h } from 'vue'
import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router'
import { BasicLayout, BlankLayout } from '@/layouts'
import { CustomIframe, NotFound } from '@/components'
import views from '@/views'
import { pascalCase } from './string'
import { combineURL, isExternal } from './url'

type Lazy<T> = () => Promise<T>

type ModuleComponent = {
  default: RouteComponent
}

/**
 * 根据页面地址获取页面
 * @param pagePath
 * @param name
 */
const getNamedView = (pagePath: string, name: string) => {
  if (isExternal(pagePath) || pagePath.startsWith('/')) {
    return defineComponent({
      name,
      setup: () => {
        return () => h(CustomIframe, { src: pagePath })
      }
    })
  } else {
    const view = views[`./${pagePath}/index.vue`] as Lazy<ModuleComponent>
    if (view) {
      return async () => {
        const result = await view()
        Object.assign(result.default, { name })
        return result
      }
    } else {
      return defineComponent({
        name,
        setup: () => {
          return () => h(NotFound)
        }
      })
    }
  }
}

/**
 * 获取第一个不为外部链接的 path
 * @param routeData
 */
const getFirstPathNotExternal = (routeData: Route.RouteData[]) => {
  for (const { path } of routeData) {
    if (!isExternal(path)) return path
  }
}

const getRootRedirect = (basicLayoutRoute: RouteRecordRaw) => {
  const routes = basicLayoutRoute.children
  if (routes?.length) {
    const firstPath = routes[0].path
    return firstPath.startsWith('/') ? firstPath : `/${firstPath}`
  }
  return undefined
}

/**
 * 转换路由
 * @param routeData
 */
export const transformRoutes = (routeData: Route.RouteData[]) => {
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

  const transform = (
    routeData: Route.RouteData[],
    parentPath?: string,
    parentPage?: string,
    parentMeta?: RouteMeta
  ) => {
    for (const { path, page, layout, redirect, children, ...rest } of routeData) {
      if (isExternal(path)) continue
      const routePath = path.startsWith('/') ? path : combineURL(parentPath, path)
      const pagePath = page ? page : combineURL(parentPage, path.split('/:')[0])
      const name = pascalCase(routePath)
      const meta = {
        ...rest,
        keepAlive: rest.keepAlive ?? parentMeta?.keepAlive,
        activeMenu: rest.activeMenu ?? parentMeta?.activeMenu
      }
      if (children?.length) {
        const firstPathNotExternal = getFirstPathNotExternal(children)
        if (!firstPathNotExternal) continue
        const redirectPath = firstPathNotExternal.startsWith('/')
          ? firstPathNotExternal
          : `/${combineURL(routePath, firstPathNotExternal)}`
        const route: RouteRecordRaw = {
          path: routePath,
          name,
          redirect: redirect ?? redirectPath,
          meta
        }
        if (layout === 'blank') {
          blankLayoutRoute.children.push(route)
        } else {
          basicLayoutRoute.children.push(route)
        }
        transform(children, routePath, pagePath, meta)
      } else {
        const component = getNamedView(pagePath, name)
        const route: RouteRecordRaw = { path: routePath, name, component, meta }
        if (route.meta?.activeMenu) {
          route.meta.activeMenu = pascalCase(route.meta.activeMenu)
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

  rootRoute.redirect = getRootRedirect(basicLayoutRoute)

  return routes
}
