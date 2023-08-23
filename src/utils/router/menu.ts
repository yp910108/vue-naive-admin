import { combineURL, isExternal, renderIcon } from '../common'
import { parsePathToName } from './helper'

/**
 * 将权限路由转换成菜单
 * @param authRoutes
 * @returns
 */
export function transformAuthRoutesToMenus(authRoutes: AuthRoute.Route[], prefix: string = '/') {
  const menus: App.GlobalMenuOption[] = []
  for (const authRoute of authRoutes) {
    const { title, path, icon, children } = authRoute
    const fullpath = isExternal(path) ? path : `/${combineURL(prefix, path)}`
    const name = parsePathToName(fullpath)
    const menu: App.GlobalMenuOption = {
      key: name,
      label: title,
      routePath: fullpath
    }
    if (icon) {
      menu.icon = renderIcon({ icon })
    }
    if (children && children.length) {
      menu.children = transformAuthRoutesToMenus(children, fullpath)
    }
    menus.push(menu)
  }
  return menus
}

/**
 * 根据当前选中的菜单获取父级（包括自己）的菜单路径
 * @param activeKey
 * @param menus
 */
export function getActiveKeyPathsOfMenus(activeKey: string, menus: App.GlobalMenuOption[]) {
  const keys: string[] = []
  for (const menu of menus) {
    const { key, children } = menu
    if (activeKey.startsWith(key)) {
      keys.push(key)
      if (children && children.length) {
        const _keys = getActiveKeyPathsOfMenus(activeKey, children)
        keys.push(..._keys)
      }
    }
  }
  return keys
}

/**
 * 将权限路由转换为搜索菜单
 * @param authRoutes
 */
export function transformAuthRoutesToSearchMenus(menus: App.GlobalMenuOption[]) {
  const searchMenus: App.GlobalSearchMenu[] = []
  for (const menu of menus) {
    const { children, ...rest } = menu
    searchMenus.push({ ...rest })
    if (children && children.length) {
      const _searchMenus = transformAuthRoutesToSearchMenus(children)
      searchMenus.push(..._searchMenus)
    }
  }
  return searchMenus
}
