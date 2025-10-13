import { h } from 'vue'
import { combineURL, isExternal, pascalCase } from '@/utils'
import { icons } from '@/components'

/**
 * 将权限路由转换成菜单
 * @param routeData
 * @param prefix
 */
export const transformMenus = (routeData: Route.RouteData[], parentPath: string = '/') => {
  const menus: Menu.MenuOption[] = []
  for (const { title, path, icon, children } of routeData) {
    const routePath =
      isExternal(path) || path.startsWith('/') ? path : `/${combineURL(parentPath, path)}`
    const name = pascalCase(routePath)
    const menu: Menu.MenuOption = {
      key: name,
      label: title,
      routePath
    }
    if (icon) {
      if (icons[icon]) {
        menu.icon = () => h(icons[icon])
      } else {
        console.warn(`图标 ${icon} 不存在！`)
      }
    }
    if (children?.length) {
      menu.children = transformMenus(children, routePath)
    }
    menus.push(menu)
  }
  return menus
}

/**
 * 将权限路由转换为搜索菜单
 * @param authRoutes
 */
export const transformSearchMenus = (menus: Menu.MenuOption[]) => {
  const searchMenus: Menu.SearchMenuOption[] = []
  for (const menu of menus) {
    const { children, ...rest } = menu
    searchMenus.push({ ...rest })
    if (children?.length) {
      const _searchMenus = transformSearchMenus(children)
      searchMenus.push(..._searchMenus)
    }
  }
  return searchMenus
}
