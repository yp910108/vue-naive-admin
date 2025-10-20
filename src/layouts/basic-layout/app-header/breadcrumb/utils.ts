/**
 * 根据路由 name 获取面包屑
 * @param routeName
 * @param menus
 */
export const getBreadcrumbsNyRouteName = (routeName: string, menus: Menu.MenuOption[]) => {
  const breadcrumbs: Menu.MenuOption[] = []
  for (const menu of menus) {
    const { key, children } = menu
    if (routeName.includes(key)) {
      breadcrumbs.push(menu)
      if (children?.length) {
        const _menus = getBreadcrumbsNyRouteName(routeName, children)
        breadcrumbs.push(..._menus)
      }
    }
  }
  return breadcrumbs
}
