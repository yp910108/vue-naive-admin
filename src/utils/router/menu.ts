import { $t } from '@/locales'
import { renderIcon } from '../common'

/**
 * 将权限路由转换成菜单
 * @param authRoutes
 * @returns
 */
export function transformAuthRouteToMenu(authRoutes: AuthRoute.Route[]) {
  const menus: App.GlobalMenuOption[] = []
  for (const authRoute of authRoutes) {
    const { name, path, meta, children } = authRoute
    if (meta.hide) continue
    const menu: App.GlobalMenuOption = {
      key: name,
      label: meta.title,
      routeName: name,
      routePath: path,
      i18nTitle: meta.i18nTitle
    }
    if (meta.icon) {
      menu.icon = renderIcon({ icon: meta.icon })
    }
    if (children && children.length) {
      menu.children = transformAuthRouteToMenu(children)
    }
    menus.push(menu)
  }
  return menus
}

/**
 * 将权限路由转换成搜索的菜单数据
 * @param authRoutes
 * @returns
 */
export function transformAuthRouteToSearchMenus(authRoutes: AuthRoute.Route[]) {
  const menus: AuthRoute.Route[] = []
  for (const authRoute of authRoutes) {
    const { meta, children } = authRoute
    if (meta.hide) continue
    menus.push(authRoute)
    if (children && children.length) {
      const _authRoutes = transformAuthRouteToSearchMenus(children)
      for (const _authRoute of _authRoutes) {
        menus.push(_authRoute)
      }
    }
  }
  return menus
}

/**
 * 翻译菜单
 * @param menus
 */
export function translateMenuLabel(menus: App.GlobalMenuOption[]): App.GlobalMenuOption[] {
  const globalMenu: App.GlobalMenuOption[] = []
  menus.forEach((menu) => {
    let menuChildren: App.GlobalMenuOption[] | undefined
    if (menu.children && menu.children.length > 0) {
      menuChildren = translateMenuLabel(menu.children)
    }
    const menuItem: App.GlobalMenuOption = {
      ...menu,
      children: menuChildren,
      label: menu.i18nTitle ? $t(menu.i18nTitle) : menu.label
    }
    globalMenu.push(menuItem)
  })
  return globalMenu
}

function getActiveKeyPathsOfMenu(activeKey: string, menu: App.GlobalMenuOption) {
  const keys: string[] = []
  if (activeKey.startsWith(menu.routeName)) {
    keys.push(menu.routeName)
  }
  if (menu.children) {
    keys.push(
      ...menu.children
        .map((item) => getActiveKeyPathsOfMenu(activeKey, item as App.GlobalMenuOption))
        .flat(1)
    )
  }
  return keys
}

/**
 * 获取当前路由所在菜单数据的 paths
 * @param activeKey
 * @param menus
 */
export function getActiveKeyPathsOfMenus(activeKey: string, menus: App.GlobalMenuOption[]) {
  const keys = menus.map((menu) => getActiveKeyPathsOfMenu(activeKey, menu)).flat(1)
  return keys
}
