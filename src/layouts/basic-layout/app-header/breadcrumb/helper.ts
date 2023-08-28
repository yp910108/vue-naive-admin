/**
 * 根据路由 name 获取面包屑
 * @param routeName
 * @param menus
 */
export function getBreadcrumbsNyRouteName(routeName: string, menus: App.MenuOption[]) {
  const breadcrumbs: App.Breadcrumb[] = []
  for (const menu of menus) {
    const { key, children } = menu
    if (routeName.includes(key)) {
      breadcrumbs.push(menu)
      if (children && children.length) {
        const _menus = getBreadcrumbsNyRouteName(routeName, children)
        breadcrumbs.push(..._menus)
      }
    }
  }
  return breadcrumbs
}
