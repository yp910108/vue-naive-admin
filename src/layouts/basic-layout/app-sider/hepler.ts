import type { MenuOption } from '@/store'

/**
 * 根据当前选中的菜单获取父级（包括自己）的菜单路径
 * @param activeKey
 * @param menus
 */
export function getActiveKeyPathsOfMenus(activeKey: string, menus: MenuOption[]) {
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
