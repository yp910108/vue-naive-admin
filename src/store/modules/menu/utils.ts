import { h } from 'vue'
import { camelize, combineURL, isExternal } from '@/utils'
import { Icons } from '@/components'
import type { RouteData } from '../route'
import type { MenuOption, SearchMenuOption } from './typings'

/**
 * 通过路径获取组件名称
 * @param path
 */
export function parsePathToName(path: string) {
  path = path.split('/:')[0].replace(/\//g, '-')
  return camelize(path, true)
}

/**
 * 将权限路由转换成菜单
 * @param routeData
 * @param prefix
 */
export function transformMenus(routeData: RouteData[], prefix: string = '/') {
  const menus: MenuOption[] = []
  for (const { title, path, icon, children } of routeData) {
    const routePath = isExternal(path) ? path : `/${combineURL(prefix, path)}`
    const name = parsePathToName(routePath)
    const menu: MenuOption = {
      key: name,
      label: title,
      routePath
    }
    if (icon) {
      if (Icons[icon]) {
        menu.icon = () => h(Icons[icon])
      } else {
        console.warn(`图标 ${icon} 不存在！`)
      }
    }
    if (children && children.length) {
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
export function transformSearchMenus(menus: MenuOption[]) {
  const searchMenus: SearchMenuOption[] = []
  for (const menu of menus) {
    const { children, ...rest } = menu
    searchMenus.push({ ...rest })
    if (children && children.length) {
      const _searchMenus = transformSearchMenus(children)
      searchMenus.push(..._searchMenus)
    }
  }
  return searchMenus
}
