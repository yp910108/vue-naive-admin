/**
 * 路由排序
 * @param routes
 * @returns 排序后的路由
 */
export function sortRoutes(routes: AuthRoute.Route[]): AuthRoute.Route[] {
  return routes
    .sort((next, pre) => Number(next.meta.order) - Number(pre.meta.order))
    .map((i) => {
      if (i.children) sortRoutes(i.children)
      return i
    })
}

/**
 * 处理全部导入的路由模块
 * @param modules
 * @returns
 */
export function handleModuleRoutes(modules: AuthRoute.RouteModule): AuthRoute.Route[] {
  const routes: AuthRoute.Route[] = []

  for (const key of Object.keys(modules)) {
    const item = modules[key].default
    if (item) {
      routes.push(item)
    } else {
      console.error(`路由解析出错：key=${key}`)
    }
  }

  return sortRoutes(routes)
}
