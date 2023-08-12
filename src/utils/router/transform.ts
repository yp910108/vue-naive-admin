import type { RouteRecordRaw } from 'vue-router'
import { getLayoutComponent, getViewComponent } from './component'

type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>

/**
 * 是否有外链
 * @param authRoute 权限路由
 */
function hasHref(authRoute: AuthRoute.Route) {
  return Boolean(authRoute.meta.href)
}

/**
 * 是否有路由组件
 * @param authRoute 权限路由
 */
function hasComponent(authRoute: AuthRoute.Route) {
  return Boolean(authRoute.component)
}

/**
 * 是否有子路由
 * @param authRoute 权限路由
 */
function hasChildren(authRoute: AuthRoute.Route) {
  return Boolean(authRoute.children && authRoute.children.length)
}

/**
 * 是否是单层路由
 * @param authRoute
 */
function isSingleRoute(authRoute: AuthRoute.Route) {
  return Boolean(authRoute.meta.singleLayout)
}

/**
 * 将单个权限路由转换成 vue 路由
 * @param authRoute
 * @returns vueRoute
 */
export function transformAuthRouteToVueRoute(authRoute: AuthRoute.Route) {
  const resultRoutes: RouteRecordRaw[] = []

  const route = { ...authRoute } as RouteRecordRaw

  // 外链路由
  if (hasHref(authRoute)) {
    route.component = getViewComponent('404')
  }

  // 路由组件
  if (hasComponent(authRoute)) {
    const action: ComponentAction = {
      basic() {
        route.component = getLayoutComponent('basic')
      },
      blank() {
        route.component = getLayoutComponent('blank')
      },
      multi() {
        if (hasChildren(authRoute)) {
          route.meta = { ...route.meta!, multi: true }
          delete route.component
        } else {
          console.error('多级路由缺少子路由：', authRoute)
        }
      },
      self() {
        route.component = getViewComponent(authRoute.name as AuthRoute.LastDegreeRouteKey)
      }
    }
    try {
      action[authRoute.component!]()
    } catch {
      console.error('路由组件解析失败: ', authRoute)
    }
  }

  // 单层路由
  if (isSingleRoute(authRoute)) {
    if (hasChildren(authRoute)) {
      console.error('单独路由不应该有子路由: ', authRoute)
    }
    if (authRoute.name === 'not-found') {
      route.children = [
        {
          path: '',
          name: authRoute.name,
          component: getViewComponent('not-found')
        }
      ]
    } else {
      const parentPath = `${route.path}-parent` as AuthRouteUtils.SingelRouteKey

      const layout =
        authRoute.meta.singleLayout === 'basic'
          ? getLayoutComponent('basic')
          : getLayoutComponent('blank')

      const parentRoute: RouteRecordRaw = {
        path: parentPath,
        component: layout,
        redirect: authRoute.path,
        children: [route]
      }

      return [parentRoute]
    }
  }

  if (hasChildren(authRoute)) {
    const children = (authRoute.children as AuthRoute.Route[])
      .map((child) => transformAuthRouteToVueRoute(child))
      .flat()

    const redirectPath = (children.find((v) => !v.meta?.multi)?.path ?? '/') as AuthRoute.RoutePath

    if (redirectPath === '/') {
      console.error('该多级路由没有有效的子路径', authRoute)
    }

    if (authRoute.component === 'multi') {
      resultRoutes.push(...children)
      delete route.children
    } else {
      route.children = children
    }
    route.redirect = redirectPath
  }

  resultRoutes.push(route)

  return resultRoutes
}

/**
 * 将权限路由转换为 vue 路由
 * @param authRoutes
 * @returns vueRoutes
 */
export function transformAuthRoutesToVueRoutes(authRoutes: AuthRoute.Route[]) {
  return authRoutes.map((authRoute) => transformAuthRouteToVueRoute(authRoute)).flat(1)
}

/**
 * 将路由 name 转换成路由 path
 * @param name
 * @returns path
 */
export function transformRouteNameToRoutePath(name: Exclude<AuthRoute.AllRouteKey, 'not-found'>) {
  const rootPath: AuthRoute.RoutePath = '/'
  if (name === 'root') return rootPath

  const path = name.split('_').join('/')

  return `/${path}` as AuthRoute.RoutePath
}

/**
 * 将路由 path 转换成路由 name
 * @param path
 * @returns name
 */
export function transformRoutePathToRouteName<K extends AuthRoute.RoutePath>(path: K) {
  if (path === '/') return 'root'

  const name = path.split('/').slice(1).join('_')

  return name as AuthRoute.AllRouteKey
}
