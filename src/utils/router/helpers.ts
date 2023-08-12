function getConstantRouteName(route: AuthRoute.Route) {
  const names = [route.name]
  if (route.children?.length) {
    names.push(...route.children.map((item) => getConstantRouteName(item)).flat())
  }
  return names
}

/**
 * 获取所有固定路由的名称集合
 * @param route 固定路由
 * @returns 路由名称数组
 */
export function getConstantRouteNames(routes: AuthRoute.Route[]) {
  return routes.map((route) => getConstantRouteName(route)).flat()
}
