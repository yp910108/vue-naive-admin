import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/store'
import { createDynamicRouteGuard } from './dynamic'
import { exeStrategyActions, localStg } from '@/utils'
import { routeName } from '..'

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const permission = await createDynamicRouteGuard(to, from, next)
  if (!permission) return

  if (to.meta.href) {
    window.open(to.meta.href)
    next({ path: from.fullPath, replace: true, query: from.query })
    return
  }

  const auth = useAuthStore()
  const isLogin = Boolean(localStg.get('token'))
  const permissions = to.meta.permissions ?? []
  const needLogin = Boolean(to.meta.requiresAuth) || Boolean(permissions.length)
  const hasPermission = !permissions.length || permissions.includes(auth.userInfo.userRole)

  const actions: Common.StrategyAction[] = [
    // 已登录状态并且跳转至登录页，跳转至首页
    [
      isLogin && to.name === routeName('root'),
      () => {
        next({ name: routeName('root') })
      }
    ],
    // 不需要登录权限的页面直接通行
    [
      !needLogin,
      () => {
        next()
      }
    ],
    // 未登录状态进入需要登录权限的页面
    [
      !isLogin && needLogin,
      () => {
        const redirect = to.fullPath
        next({ name: routeName('login'), query: { redirect } })
      }
    ],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [
      isLogin && needLogin && hasPermission,
      () => {
        next()
      }
    ],
    // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
    [
      isLogin && needLogin && !hasPermission,
      () => {
        next({ name: routeName('403') })
      }
    ]
  ]

  exeStrategyActions(actions)
}
