/**
 * 根据用户权限过单个滤路由
 * @param authRoute
 * @param permission
 * @returns 过滤后的路由
 */
function filterAuthRouteByUserPermission(
  authRoute: AuthRoute.Route,
  permission: Auth.RoleType
): AuthRoute.Route[] {
  const hasPermission =
    !authRoute.meta.permissions ||
    permission === 'super' ||
    authRoute.meta.permissions.includes(permission)

  if (authRoute.children) {
    const filterChild = authRoute.children
      .map((item) => filterAuthRouteByUserPermission(item, permission))
      .flat()
    authRoute.children = filterChild
  }
  return hasPermission ? [authRoute] : []
}

/**
 * 根据用户权限过滤路由
 * @param authRoutes
 * @param permission
 * @returns 过滤后的路由
 */
export function filterAuthRoutesByUserPermission(
  authRoutes: AuthRoute.Route[],
  permission: Auth.RoleType
): AuthRoute.Route[] {
  return authRoutes
    .map((authRoute) => filterAuthRouteByUserPermission(authRoute, permission))
    .flat()
}
