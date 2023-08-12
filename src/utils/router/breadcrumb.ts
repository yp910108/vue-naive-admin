/**
 * 根据单个菜单数据获取面包屑格式的菜单
 * @param activeKey
 * @param menu
 */
function getBreadcrumbMenuItem(activeKey: string, menu: App.GlobalMenuOption) {
  const breadcrumbMenu: App.GlobalMenuOption[] = []
  if (activeKey === menu.routeName) {
    breadcrumbMenu.push(menu)
  }
  if (activeKey.includes(menu.routeName) && menu.children && menu.children.length) {
    breadcrumbMenu.push(menu)
    breadcrumbMenu.push(
      ...menu.children
        .map((item) => getBreadcrumbMenuItem(activeKey, item as App.GlobalMenuOption))
        .flat(1)
    )
  }

  return breadcrumbMenu
}

/**
 * 根据菜单数据获取面包屑格式的菜单
 * @param activeKey
 * @param menus
 */
function getBreadcrumbMenu(activeKey: string, menus: App.GlobalMenuOption[]) {
  const breadcrumbMenu: App.GlobalMenuOption[] = []
  menus.some((menu) => {
    const flag = activeKey.includes(menu.routeName)
    if (flag) {
      breadcrumbMenu.push(...getBreadcrumbMenuItem(activeKey, menu))
    }
    return flag
  })
  return breadcrumbMenu
}

/**
 * 将面包屑格式的菜单数据转换成面包屑数据
 * @param menu
 * @param rootPath
 */
function transformBreadcrumbMenuToBreadcrumb(menu: App.GlobalMenuOption, rootPath: string) {
  const hasChildren = Boolean(menu.children && menu.children.length)
  const breadcrumb: App.GlobalBreadcrumb = {
    key: menu.routeName,
    label: menu.label as string,
    routeName: menu.routeName,
    disabled: menu.routePath === rootPath,
    hasChildren,
    i18nTitle: menu.i18nTitle
  }
  if (menu.icon) {
    breadcrumb.icon = menu.icon
  }
  if (hasChildren) {
    breadcrumb.options = menu.children?.map((item) =>
      transformBreadcrumbMenuToBreadcrumb(item as App.GlobalMenuOption, rootPath)
    ) as NonNullable<App.GlobalBreadcrumb['options']>
  }
  return breadcrumb
}

/**
 * 根据菜单数据获取面包屑格式的菜单
 * @param activeKey
 * @param menus
 * @param rootPath
 */
export function getBreadcrumbByRouteKey(
  activeKey: string,
  menus: App.GlobalMenuOption[],
  rootPath: string
) {
  const breadcrumbMenu = getBreadcrumbMenu(activeKey, menus)
  const breadcrumb = breadcrumbMenu.map((item) =>
    transformBreadcrumbMenuToBreadcrumb(item, rootPath)
  )
  return breadcrumb
}
